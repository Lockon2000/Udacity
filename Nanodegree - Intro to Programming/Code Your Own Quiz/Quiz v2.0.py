import random
import sys


questions_list = {
"question1": "The shiny disk in the sky is called the {}.",
"answer1": "sun",
"question2": "The liquid which we all must intake to stay alive is called {}.",
"answer2": "water",
"question3": "Today we use wireless devices to communicate which are called {}.",
"answer3": "mobiles",
"question4": "We all live in {}.",
"answer4": "houses",
"question5": "The main type of fuel we use today is called {}.",
"answer5": "fossile fuel",
"question6": "The father of your father is your {}.",
"answer6": "grandfather",
"question7": "The son of your uncle or aunt is called {}.",
"answer7": "cousin",
"question8": "Someone who treats people is called a {}.",
"answer8": "doctor",
"question9": "The branch of science which deals with living organisms is called {}.",
"answer9": "biology",
"question10": "The most used vehicles today are called {}.",
"answer10": "cars",}


def game():
	"""The main functinon. This function takes no arguments and returns
	nothing. It initiates the game till the end and henceforth causes output
	to be printed to the screen and input to be read from the user."""
	difficulty = intro()		#Welcomes the user and askes for difficutly
	while True:
		questions(difficulty)	#Play one round of the game
		again = congrats()		#Congrats the user upon finishing and asks if he/she wants more
		if not again: break
	terminate()					#Say goodbay and exit


def intro():
	"""Welcomes the user and prompts him to enter the desired difficulty 
	then returns it as a string."""
	print "Welcome to this modest quiz game!"
	difficulty_question = "which difficulty do you want to play on? (choose from easy/medium/hard): "
	answer = defensive(raw_input(difficulty_question).lower(), "difficulty")
	# defensive(str, str) is the used function to check user input for invalid input
	return answer


def questions(difficulty):
	"""This function branches to the desired difficulty.
	It takes a string specifiying the difficulty as
	an argument and returns nothing."""
	easy_difficulty = 4					#This number means that in easy 
	medium_difficulty = 6				#difficulty four questions will be asked
	hard_difficulty = 8
	if difficulty == "easy":
		ask(easy_difficulty)
	elif difficulty == "medium":
		ask(medium_difficulty)
	else:								# means hard difficulty
		ask(hard_difficulty)
	return


def congrats():
	"""Congratulates the user upon finishing the game and asks 
	if he wants to continue then returns True of False accordigly"""
	print "Congratulations!!!\nYou finished the quiz successfully"
	answer = defensive(raw_input("Do you want to play another time? (yes/no): ").lower(),
		"continue")
	if answer == "yes":
		return True
	else:
		return False


def terminate():
	"""Thanks the user and exits the program. No arguments and of course
	no returns"""
	print "Thanks for playing the game!!!\nI hope you had fun.\nSee you next time."
	sys.exit()


def ask(number_of_questions):
	"""The actual quiz. It takes the number of questions to be asked
	which are determined through the difficulty. It returns nothing
	but prints the questions and takes the input and evaluates it."""
	for number in range(0, number_of_questions):
		choosen_question = str(random.randint(1,10))
		question = questions_list["question"+choosen_question]
		answer = questions_list["answer"+choosen_question]
		print "Question number", number+1, "of", number_of_questions
		print question.format('_'*len(answer))
		user_answer = defensive(raw_input("Your answer: ").lower(), "question")
		if user_answer == answer:
			print "Correct!!"
			print question.format('('+answer+')')
			number += 1
		else:					#Wrong answer
			while True:
				print "Incorrect"
				user_answer = defensive(raw_input("Try again: ").lower(), "question")
				if user_answer == answer: break
	return


def defensive(answer, context):
	"""The validity check. (answer) is the input and (context) refers to the
	 specific point where the user entered his/her answer"""
	if context == "difficulty":
		if answer in ["easy", "medium", "hard"]:
			return answer
		else:					#invalid input
			while True:
				answer = raw_input("Invalid input\nTry agian (easy/medium/hard): ").lower
				if answer in ["easy", "medium", "hard"]: break
			return answer
	elif context == "continue":
		if answer in ["yes", "no"]:
			return answer
		else:					#invalid input
			while True:
				answer = raw_input("Invalid input\nTry agian (yes/no): ").lower
				if answer in ["yes", "no"]: break
			return answer
	else:						# means context is question and here any kind of input is valid
		return answer


"""---------------------------Program start------------------------"""	


game()		#This is every thing we need to start the game