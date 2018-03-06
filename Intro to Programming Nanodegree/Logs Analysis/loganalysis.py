#!/usr/bin/env python3

# imports section
import psycopg2


# Global variables
querys = ["SELECT articles.title, count(log.id) AS views "
          "FROM articles LEFT JOIN log "
          "ON log.path like '%' || articles.slug "
          "GROUP BY articles.title "
          "ORDER BY views DESC;",
          "SELECT authors.name, sum(p.views) as views "
          "FROM authors LEFT JOIN popular AS p "
          "ON authors.id = p.author "
          "GROUP BY authors.name "
          "ORDER BY views DESC;",
          "SELECT a.d AS Date, a.t AS Total, round(((b.e/a.t::real)*100)"
          "::numeric, 5) AS \"Error Percentage\" "
          "FROM (SELECT date(time) AS d, count(*) AS t "
          "      FROM log "
          "      GROUP BY date(time)) AS a "
          "JOIN (SELECT date(time) AS d, count(*) AS e "
          "      FROM log "
          "      WHERE status LIKE '404%' "
          "      GROUP BY date(time)) AS b "
          "ON a.d = b.d "
          "ORDER BY \"Error Percentage\" DESC;"]

view = ("CREATE OR REPLACE view popular AS "
        "SELECT articles.title, articles.author, s.views "
        "FROM articles "
        "JOIN (SELECT articles.title as t, count(log.id) AS views "
        "      FROM articles LEFT JOIN log "
        "      ON log.path like '%' || articles.slug "
        "      GROUP BY articles.title) AS s "
        "ON articles.title = s.t "
        "ORDER BY s.views DESC;")

number_of_questions = 3
number_of_articles = 100    # Just some arbitrary Choice
number_of_authors = 20      # Just some arbitrary Choice


def main():
    """The main function which starts the program"""
    intro()
    input("(Press any key to continue)\n")
    while True:
        question_spec = print_question()
        query(question_spec)
        if not again():
            break
    terminate()


def intro():
    """Prints the welcome screen"""
    print("+---------------------------------+\n"
          "|Log Analysis of the News Database|\n"
          "+---------------------------------+\n"
          "\nWelcome\n"
          "This program provides some basic analysis functions to "
          "the News Database.\n"
          "The functionality is provided through querys run against "
          "the PostgreSQL Database.\n")

    return


def print_question():
    """Prints the supported questions and returns the choices"""
    print("\n\nThe provided questions are:\n"
          "1. What are the most popular articles of all time?\n"
          "2. Who are the most popular article authors of all time?\n"
          "3. On which days did a certain percent of requests lead "
          "to errors?\n")

    answer = [defensive1(input("Your desired Question (input a "
                               "number 1-%s): " % number_of_questions),
                         1, number_of_questions)]

    if answer[0] == 1:
        answer.append(defensive1(input(
            "How many top articles should be displayed? "
            "(input a number 1-%s): " % number_of_articles),
            1, number_of_articles))
    elif answer[0] == 2:
        answer.append(defensive1(input(
            "How many top authors should be displayed? "
            "(input a number 1-%s): " % number_of_authors),
            1, number_of_authors))
    else:
        answer.append(defensive1(input(
            "Input the desired percentage (0-100): "), 0, 100))

    return answer


def query(question_spec):
    """Connect to databese and issue queries"""
    com = psycopg2.connect(database="news")
    c = com.cursor()
    c.execute(view)            # Create or replace the views
    c.execute(querys[question_spec[0]-1])
    results = c.fetchall()
    display(question_spec, results)
    com.close()

    return


def again():
    """Asks if the user wants to ask another question"""
    if defensive2(input("\n\nDo you want to ask another Question? "
                        "(Y\\N): ").upper()) == 'Y':
        return True
    else:
        return False


def terminate():
    print("I hope you found the analysis helpful.\n"
          "Exiting!!!")

    return


def display(question_spec, results):
    """Format the fetched data and display it"""
    if question_spec[0] == 1:
        print("The most popular articles are:\n")
        i = 0
        while i < question_spec[1] and i < len(results):
            print(results[i][0] + " {} ".format('-'*(40-len(results[i][0]))) +
                  str(results[i][1]) + " views.")
            i += 1
            if i == len(results):
                print("+++++++++++++++++ No more articles +++++++++++++++++")

    elif question_spec[0] == 2:
        print("The most popular writers are:\n")
        i = 0
        while i < question_spec[1] and i < len(results):
            print(results[i][0] + " {} ".format('-'*(30-len(results[i][0]))) +
                  str(results[i][1]) + " views.")
            i += 1
            if i == len(results):
                print("+++++++++++++++++ No more authors +++++++++++++++++")

    else:
        print("The days with errors more than " + str(question_spec[1]) +
              "%% are:\n\n"
              "   Date    - Total - Error Percentage")
        i = 0
        while i < len(results) and int(results[i][2]) >= question_spec[1]:
            print(str(results[i][0]) + " - " + str(results[i][1]) + " - " +
                  str(results[i][2]) + "%.")
            i += 1

    return


def defensive1(user_answer, limit1, limit2):
    """Makes sure the user input is correct and provieds user friendliness"""
    valid = False
    while not valid:
        if str.isdigit(user_answer):
            if limit1 <= int(user_answer) <= limit2:
                valid = True
            else:
                user_answer = input("Invalid. Please input a number between " +
                                    str(limit1) + " and " + str(limit2) + ": ")
        else:
            user_answer = input("Invalid. Please input a number between " +
                                str(limit1) + " and " + str(limit2) + ": ")

    return int(user_answer)


def defensive2(user_answer):
    """Makes sure the user input is correct and provieds user friendliness"""
    if user_answer != 'Y' and user_answer != 'N':
        while True:
            user_answer = input("Invalid input!!!\nDo you want to ask another "
                                "Question? (Y\\N): ")
            if not (user_answer != 'Y' and user_answer != 'N'):
                break

    return user_answer


if __name__ == "__main__":
    main()
