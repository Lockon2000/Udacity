import webapp2
import jinja2
import os
import re
import functions


template_dir = os.path.join(os.path.dirname(__file__), "templates")
jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir),
                               autoescape = True)


class Handler(webapp2.RequestHandler):
    def write(self, *a, **kw):
        self.response.write(*a, **kw)

    def render_str(self, template, **params):
        t = jinja_env.get_template(template)
        return t.render(params)

    def render(self, template, **kw):
        self.write(self.render_str(template, **kw))

class mainHandler(Handler):
    def get(self):
        self.render('index.html', title="Main Page")

class shoppingListHandler(Handler):
    def get(self):
        items = self.request.get_all("food")
        self.render("shopping_list.html", items= items, title="Shopping List")

class fizzBuzzHandler(Handler):
    def get(self):
        n = self.request.get('n', 0)
        n = n and int(n)
        self.render('fizzbuzz.html', n=n, title="FizzBuzz Test")

class rot13Handler(Handler):
    def get(self):
        self.render("rot13.html", title="ROT13")

    def post(self):
        message = self.request.get("text")
        self.render("rot13.html", title="ROT13", message=functions.ceaser(message))

class signUpHandler(Handler):
    def get(self):
        self.render("signup.html", title="SignUp Page")

    def post(self):
        username = self.request.get("username")
        password = self.request.get("password")
        verify = self.request.get("verify")
        email = self.request.get("email")
        usernameErrorLevel = not (re.compile(r"^[a-zA-Z0-9_-]{3,20}$").match(username))
        passwordErrorLevel = not (re.compile(r"^.{3,20}$").match(password))
        varifyErrorLevel = not (password == verify)
        emailErrorLevel = not (re.compile(r"^[\S]+@[\S]+.[\S]+$").match(email))

        if (usernameErrorLevel or passwordErrorLevel or
            varifyErrorLevel or emailErrorLevel):
            self.render("signup.html", title="SignUp Page", username=username, email=email,
                        usernameErrorLevel=usernameErrorLevel,
                        passwordErrorLevel=passwordErrorLevel,
                        varifyErrorLevel=varifyErrorLevel,
                        emailErrorLevel=emailErrorLevel)
        else:
            self.redirect("/success")

class successHandler(Handler):
    def get(self):
        self.render("success.html", title="Congrats!!!")



app = webapp2.WSGIApplication([('/', mainHandler),
                               ('/shopping_list', shoppingListHandler),
                               ('/fizzbuzz', fizzBuzzHandler),
                               ('/rot13', rot13Handler),
                               ("/signup", signUpHandler),
                               ("/success", successHandler)],
                              debug=True)
