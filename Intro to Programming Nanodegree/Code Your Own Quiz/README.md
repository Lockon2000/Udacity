1. Prompt the user welcoming him/her and asking for the appropriate level (easy/medium/hard)
2. getting the level difficulty and inject it internally
3. generate the question
4. get answers and evaluate it
5. if the answer is correct generating the next line (if end is not reached) or else prompt the user to try again
6. continue from step 4 again if the end is not reached
7. congratulate the user on finishing and ask if he/her wants to play again
8. get answers and inject it
9. if he/her answers yes, repeat steps from 1 else terminate the program
									
								    ||
								    ||
								    ||  Translated Pseudoalgorithm
								    ||
								   \  /
								    \/

info: names in square brackets need to be further expanded or defined.

```
define game():
	create var difficulty
	difficulty <-- [intro()]
	do
		create var continue
		[questions(difficulty)]
		again <-- [congrats()]
	while (again)
	[terminate()]
```

a level deeper:

```
define intro():
	write to screen "Welcome to this modest quiz game\n"
	write to screen "whiche difficulty do you want to play on? (choose from easy/medium/hard): "
	create var answer
	answer <-- user input
	return answer
```

```
define questions(difficulty):
	if difficulty equals "easy" then
		[ask(4)]
	else if difficulty equals "medium" then
		[ask(5)]
	else
		[ask(6)]
	return
```

```
define congrats():
	write to screen "Congratulations!!!\n You finished the quiz successfully\n"
	write to screen "Do you want to play another time? (yes/no): "
	create var answer
	answer <-- user input
	if answer equals "yes" then
		return true
	else
		return false
```

```
define terminate():
	write to screen "Thanks for playing the game!!!\nI hope you had fun\nSee you next time"
	exit program
```

a level deeper:

```
define ask(number_of_questions):
	create var number <-- 1
	while (number <= number_of_questions) then
		create var question <-- random entry from questions_list  # question is an ordered pair with the question as its first member and the answer as its second
		create var answer
		write to screen first member of question
		answer <-- user input
		if answer equals second member of question then
			write to screen "Correct!!\n"
			increment number
		else
			do
				write to screen "Incorrect. Try again: "
				answer <-- user input
			while (answer is not equal to second member of question)
	return
```


Now the program is virtually complete. But i could program a little more to check user input as well (defensive).

The idea is simple. Every place where (user input) appears will be substituted by defensive(user input, context), that is a function call to defensive(str, str) which takes two strings and checks whether it is a valid input given the context (the context parameter defines the context in which the user is prompted to enter answers). It asks the user to try again if his answer is not valid. If it is valid it gives the answer back.

The algorithm will look like this:

```
define defensive(answer, context):
	if context equals "difficulty" then
		if answer equals "easy" or "medium" or "hard" then
			return answer
		else
			do
				write to screen "Invalid input\nTry agian (easy/medium/hard): "
				answer <-- user input
			whlie (answer is not equal to "easy" or "medium" or "hard")
	else if context equals "continue" then
		if answer equals "yes" or "no" then
			return answer
		else
			do
				write to screen "Invalid input\nTry agian (yes/no): "
				answer <-- user input
			whlie (answer is not equal to "yes" or "no")
	else
		return answers 				# context is question. here any kind of input is valid
```

So finally the complete pseudocode looks like this:

____________________________________________________________________________________________________________

```
define game():
	create var difficulty
	difficulty <-- intro()
	do
		create var continue
		questions(difficulty)
		continue <-- congrats()
	while (continue)
	terminate()

--------------------------

define intro():
	write to screen "Welcome to this modest quiz game\n"
	write to screen "whiche difficulty do you want to play on? (choose from easy/medium/hard): "
	create var answer
	answer <-- defensive(user input, "difficulty")
	return answer

--------------------------

define questions(difficulty):
	if difficulty equals "easy" then
		ask(4)
	else if difficulty equals "medium" then
		ask(5)
	else
		ask(6)
	return

--------------------------

define congrats():
	write to screen "Congratulations!!!\n You finished the quiz successfully\n"
	write to screen "Do you want to play another time? (yes/no): "
	create var answer
	answer <-- defensive(user input, "continue")
	if answer equals "yes" then
		return true
	else
		return false

-------------------------

define terminate():
	write to screen "Thanks for playing the game!!!\nI hope you had fun\nSee you next time"
	exit program

-------------------------

define ask(number_of_questions):
	create var number <-- 1
	while (number <= number_of_questions) then
		create var question <-- random entry from questions_list  # question is an ordered pair with the question as its first member and the answer as its second
		write to screen first member of question
		write to screen "Your answer: "
		create var answer
		answer <-- defensive(user input, "question")
		if answer equals second member of question then
			write to screen "Correct!!\n"
			increment number
		else
			do
				write to screen "Incorrect. Try again: "
				answer <-- defensive(user input, "question")
			while (answer is not equal to second member of question)
	return

-------------------------

define defensive(answer, context):
	if context equals "difficulty" then
		if answer equals "easy" or "medium" or "hard" then
			return answer
		else
			do
				write to screen "Invalid input\nTry agian (easy/medium/hard): "
				answer <-- user input
			whlie (answer is not equal to "easy" or "medium" or "hard")
			return answer
	else if context equals "continue" then
		if answer equals "yes" or "no" then
			return answer
		else
			do
				write to screen "Invalid input\nTry agian (yes/no): "
				answer <-- user input
			whlie (answer is not equal to "yes" or "no")
			return answer
	else
		return answers 				# context is question. here any kind of input is valid
```
______________________________________________________________________________________________________________
