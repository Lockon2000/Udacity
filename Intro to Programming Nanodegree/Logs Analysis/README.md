# Intro:-

This README-file consists of three parts. The first is a normal readme conveying the provided
Functionalities. The second describes the thought process and the design choices and why they
Were taken. The third part is the pseudocode for the program. The pseudocode just provides
the conceptual basis and is independent of any system or programming language specifics or
Technicalities. And therefore there are obvious deviations in the actual implementation.


# Proviede functionalites:-

This program is a database analysis program. The object is a database called news, which
represents a news journal with articles written by certain authors. The analysis is provided
through questions which the program answers. All the answers are constructed through queries
run against the database, then the results are fetched and formatted correctly before output.


# Thought Process and Design choices:-

The program outline is simple. Ask the user which question s/he wants to ask, then run the
Appropriate query, fetch the results and format it correctly before output and that's it. quite
simple. The queries are just some basic select statements with some calculations upon existing
tables or tables acquired through joins. I made use of views but the program itself will create
them so the user doesn't have to do anything (They are listed in the last part).

As for the design choices, there aren't many because the program is fairly small. Maybe only
that I chose to make the limitations on the number of outputted items in python and not through
limits in the query. But that was just so that in the future it would have made the
Expandability much easier, nothing more (too bad that this is just a project not a real program,
so there are no further versions for this one XDXDXD). Also the numbers 100 and 20 for the
number_of_questions and number_of_authors variables are just arbitrary, representing some
sensical values (Of course I know the real numbers as I have thoroughly examined the database,
but in a real program this would not have been the case, so I went with the realistic approach).
At last I tried to make the program somewhat defensive and provide some user-friendliness.

The last section will not have any comments on the pseudocode because they are sufficiently
supplied in the actual implementation in ("loganalysis.py").


# Pseudocode

## The basic steps of the program:

1. Print title and welcome the user
2. After response print the questions which are supported
3. Get user input and inject it into the program
4. process the input and output the results
5. Ask if he wants to see the results of another question
6. if yes, repeat from step 3., else terminate the program

## 1. Level: Translation into the core algorithm of the program (pseudocode):

```
define main():
    [intro()]
    write to screen "(Press any key to continue)\n"
    get response
    do
        question_spec <-- [print_questions()]
        [query(question_spec)]
    while ([again()])
    [terminate()]
```

## 2. Level: Define the main parts of the Program:

```
define intro():
    write to screen "+---------------------------------+\n"
                    "|Log Analysis of the News Database|\n"
                    "+---------------------------------+\n"
                    "\nWelcome\n"
                    "This program provides some basic analysis functions to the News Database.\n"
                    "The functionality is provided through querys run against the PostgreSQL Database.\n"
    return
```

```
define print_questions():
    write to screen "\n\nThe provided are:\n"
                    "1. What are the most popular articles of all time?\n"
                    "2. Who are the most popular article authors of all time?\n"
                    "3. On which days did a certain percent of requests lead to errors?\n"
                    "Your desired Question (input a number 1-3): "
    answer[0] <-- [defensive1(user input, 1, 3)]
    if answer[0] = 1 then
        write to screen "How many top articles should be displayed? (input a number 1-20): "
        answer[1] <-- [defensive1(user input, 1, 20)]
    else if answer[0] = 2 then
        write to screen "How many top authors should be displayed? (input a number 1-4): "
        answer[1] <-- [defensive1(user input, 1, 4)]
    else
        write to screen "Input the desired percentage (0-100): "
        answer[1] <-- [defensive1(user input, 0, 100)]
    return answer
```

```
define query(question_spec):
    array querys <-- ["SELECT articles.title, count(log.id) AS views"
                      "FROM articles LEFT JOIN log" 
                      "ON log.path like '%' || articles.slug" 
                      "GROUP BY articles.title" 
                      "ORDER BY views DESC;",
                      "SELECT authors.name, sum(p.views) as views"
                      "FROM authors LEFT JOIN popular AS p"
                      "ON authors.id = p.author" 
                      "GROUP BY authors.name"
                      "ORDER BY views DESC;",
                      "SELECT a.d AS Date, a.t AS Total, round(((b.e/a.t::real)*100)::numeric, 5) AS Error Percentage" 
                      "FROM (SELECT date(time) AS d, count(*) AS t FROM log GROUP BY date(time)) AS a" 
                      "JOIN (SELECT date(time) AS d, count(*) AS e FROM log WHERE status LIKE '404%' GROUP BY date(time)) AS b" 
                      "ON a.d = b.d" 
                      "ORDER BY error DESC;"]
    array views <-- ["CREATE OR REPLACE view popular AS" 
                     "SELECT articles.title, articles.author, s.views" 
                     "FROM articles JOIN" 
                     "(SELECT articles.title as t, count(log.id) AS views"
                     " FROM articles LEFT JOIN log" 
                     " ON log.path like '%' || articles.slug" 
                     " GROUP BY articles.title) AS s"
                     "ON articles.title = s.t"
                     "ORDER BY s.views DESC;"]
    connect to the news database
    send querys[question_spec[0]-1]
    results <-- fetch response
    [display(question_spec, results)]
    return
```

```
define again():
    write to screen "Do you want to ask another Question? (Y\N): "
    if [defensive2(to_upper_case(user input))] = 'Y' then
        return True
    else
        return False
```

```
define terminate():
    write to screen "I hope you found the analysis helpful.\n"
                    "Exiting!!!"
    return
```

## 3. Level: Define the secondery parts:

```
define display(question_spec, results):
    if question_spec[0] = 1 then
        write to screen "The most popular articles are:\n"
        i <-- 0
        while i < question_spec[1] and i < len(results) then
            write to screen results[i][0] + " with " + results[i][1] + "views.\n"
            i <-- i+1
    else if question_spec[0] = 2 then
        write to screen "The most popular writers are:\n"
        i <-- 0
        while i < question_spec[1] and i < len(results) then
            write to screen results[i][0] + " with " + results[i][1] + "views.\n"
            i <-- i+1
    else if question_spec[0] = 3 then
        write to screen "The days with errors more than " + question_spec[1] +"% are:\n"
        i <-- 0
        while results[i][1] >= question_spec[1] and i < len(results) then
            write to screen results[i][0] + " with a total number of requests of " + results[i][1] + " and a percentage of error of" + results[i][2] + "%.\n"
            i <-- i+1
    return
```

```
define defensive1(user_answer, limit1, limit2):
    valid <-- False
    while not valid then
        if user_input is interpretable as a number then
            if limit1 <= user_answer <= limit2 then
                valid = True
            else
                write to screen "Invalid. Please input a number between" + limit1 " and " + limit2
                user_answer = user input
        else
            write to screen "Invalid. Please input a number between" + limit1 " and " + limit2
            user_answer = user input
    return user_answer
```

```
define defensive2(user_answer):
    if user_answer != 'Y' and user_answer != 'N' then
        do
            write to screen "Invalid input!!!\n"
                            "Do you want to ask another Question? (Y\N): "
            user_answer <-- to_upper_case(user input)
        while user_answer != 'Y' and user_answer != 'N'
    return user_answer
```