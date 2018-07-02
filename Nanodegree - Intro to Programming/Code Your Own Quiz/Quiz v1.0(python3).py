import random
import sys


questions_list =[("The shiny disk in the sky is called the ___.","sun"),("The liquid which we all must intake to stay alive is called _____.","water"),
				 ("Today we use wireless devices to communicate which are called ______","mobiles"),("We all live in ______","houses"),
				 ("The main type of fuel we use is called today","fossile fuel"),("The father of your father is your","grandfather"),
				 ("The son of your uncle or aunt is called _____","cousin"),("Someone who treats people is called a _____","doctor"),
				 ("The branch of science which deals with living organisms is called ______","biology"),("The most used vehicles today are called _____","cars")]

def game():
	"""The main functino"""
	difficulty = intro()
	while True:
		questions(difficulty)
		again = congrats()
		if not again: break
	terminate()

def intro():
	"""welcomes the user and prompts him to enter the desired difficulty then returns it as a string"""
	print("Welcome to this modest quiz game!")
	answer = defensive(input("whiche difficulty do you want to play on? (choose from easy/medium/hard): "), "difficulty")    # defensive(str, str) is the used function to check user input for invalid input
	return answer

def questions(difficulty):
	"""This function branches to the desired difficulty"""
	if difficulty == "easy":
		ask(4)							# the number passed is the number of questions that will be asked
	elif difficulty == "medium":
		ask(6)
	else:								# means hard difficulty
		ask(8)
	return

def congrats():
	"""Congratulates the user upon finishing the game and asks if he wants to continue then returns True of False accordigly"""
	print("Congratulations!!!\nYou finished the quiz successfully")
	answer = defensive(input("Do you want to play another time? (yes/no): "), "continue")
	if answer == "yes":
		return True
	else:
		return False

def terminate():
	"""Thanks the user and exits the program"""
	print("Thanks for playing the game!!!\nI hope you had fun\nSee you next time")
	sys.exit()

def ask(number_of_questions):
	"""The actual quiz"""
	for number in range(0, number_of_questions):
		question = questions_list[random.randint(0,9)]
		print("Question number", number+1, "of", number_of_questions)
		print(question[0])
		answer = defensive(input("Your answer: "), "question")
		if answer == question[1]:
			print("Correct!!")
			number += 1
		else:
			while True:
				print("Incorrect")
				answer = defensive(input("Try again: "), "question")
				if answer == question[1]: break
	return

def defensive(answer, context):
	"""The validity check. answer is the input and context refers to the specific point where the user entered his/her answer"""
	if context == "difficulty":
		if answer in ["easy", "medium", "hard"]:
			return answer
		else:
			while True:
				answer = input("Invalid input\nTry agian (easy/medium/hard): ")
				if answer in ["easy", "medium", "hard"]: break
			return answer
	elif context == "continue":
		if answer in ["yes", "no"]:
			return answer
		else:
			while True:
				answer = input("Invalid input\nTry agian (yes/no): ")
				if answer in ["yes", "no"]: break
			return answer
	else:															# means context is question and here any kind of input is valid
		return answer

game()		# with it we actually start the game