from flask import (Flask,
                   render_template,
                   request,
                   redirect,
                   abort,
                   jsonify,
                   url_for,
                   flash,
                   make_response,
                   g,
                   session as login_session)
from flask_httpauth import HTTPBasicAuth

from sqlalchemy import create_engine, asc
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound
from database_setup import Base, Item, User

import datetime
import httplib2
import requests
import json
import random
import string

from oauth2client.client import flow_from_clientsecrets, FlowExchangeError

# Initialzie the Flask app
app = Flask(__name__)

# Connect to Database
engine = create_engine('sqlite:///catalogwithusers.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

# Time period in which items are considerd "recent" and added to latest items
timeLimit = datetime.datetime.now()-datetime.timedelta(days=7)

# For token authentication
auth = HTTPBasicAuth()

CLIENT_ID = json.loads(open('client_secrets.json', 'r')
                       .read())['web']['client_id']

# The token is valid for 600 seconds
expirationDate = 600


@app.route('/login')
def showLogin():
    return render_template('login.html', title="Login Page",
                           redirectURL=request.referrer)


@app.route('/oauth', methods=['POST'])
def login():
    # STEP 1 - Parse the auth code
    auth_code = request.data
    print "Step 1 - Complete, received auth code %s" % auth_code

    # STEP 2 - Exchange for a token
    try:
        # Upgrade the authorization code into a credentials object
        oauth_flow = flow_from_clientsecrets('client_secrets.json', scope='')
        oauth_flow.redirect_uri = 'postmessage'
        credentials = oauth_flow.step2_exchange(auth_code)
    except FlowExchangeError:
        response = \
            make_response(json.
                          dumps('Failed to upgrade the authorization code.'),
                          401)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Check that the access token is valid.
    access_token = credentials.access_token
    url = ('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=%s' %
           access_token)
    h = httplib2.Http()
    result = json.loads(h.request(url, 'GET')[1])
    # If there was an error in the access token info, abort.
    if result.get('error') is not None:
        response = make_response(json.dumps(result.get('error')), 500)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Verify that the access token is used for the intended user.
    gplus_id = credentials.id_token['sub']
    if result['user_id'] != gplus_id:
        response = \
            make_response(json.
                          dumps("Token's userID doesn't match given user ID."),
                          401)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Verify that the access token is valid for this app.
    if result['issued_to'] != CLIENT_ID:
        response = \
            make_response(json.
                          dumps("Token's client ID does not match app's."),
                          401)
        response.headers['Content-Type'] = 'application/json'
        return response

    stored_credentials = login_session.get('credentials')
    stored_gplus_id = login_session.get('gplus_id')
    if stored_credentials is not None and gplus_id == stored_gplus_id:
        response = \
            make_response(json.dumps('Current user is already connected.'),
                          200)
        response.headers['Content-Type'] = 'application/json'
        return response
    print "Step 2 Complete! Access Token : %s " % credentials.access_token

    # Store the access token in the session for later use.
    login_session['access_token'] = credentials.access_token
    login_session['gplus_id'] = gplus_id

    # STEP 3 - Find User or make a new one
    # Get user info
    userinfo_url = "https://www.googleapis.com/oauth2/v1/userinfo"
    params = {'access_token': credentials.access_token, 'alt': 'json'}
    answer = requests.get(userinfo_url, params=params)

    data = answer.json()

    login_session['username'] = data['name']
    login_session['picture'] = data['picture']
    login_session['email'] = data['email']
    login_session['provider'] = 'google'

    # see if user exists, if he doesn't make a new one
    user = getUser(data["email"])
    if not user:
        user = createUser(login_session)
    login_session['user_id'] = user.id

    # STEP 4 - Make token
    token = user.generate_auth_token(expirationDate)

    # STEP 5 - Send back token to the client
    flash("you are now logged in as %s" % login_session['username'])
    return jsonify({'username': login_session['username'],
                    'picture': login_session['picture'],
                    'token': token.decode('ascii'),
                    'duration': expirationDate})


@app.route('/disconnect')
def disconnect():
    # Only disconnect a connected user.
    access_token = login_session.get('access_token')
    if access_token is None:
        flash("Current user not connected.")
        return redirect(url_for("showCatalog"))
    # The api url to revoke a token
    url = 'https://accounts.google.com/o/oauth2/revoke?token=%s' % access_token
    h = httplib2.Http()
    # Revoke token
    result = h.request(url, 'GET')[0]
    if result['status'] == '200':
        # Delete all user values from the login_session variable
        del login_session['gplus_id']
        del login_session['access_token']
        del login_session['username']
        del login_session['email']
        del login_session['picture']
        del login_session['user_id']
        del login_session['provider']
        flash("Successfully disconnected!")
        return redirect(url_for("showCatalog"))
    else:
        flash("Failed to revoke token for given user!")
        return redirect(url_for("showCatalog"))


def createUser(login_session):
    newUser = User(username=login_session['username'],
                   email=login_session['email'],
                   picture=login_session['picture'])
    session.add(newUser)
    session.commit()
    user = session.query(User).filter_by(email=login_session['email']).one()
    return user


def getUser(email):
    try:
        user = session.query(User).filter_by(email=email).one()
        return user
    except NoResultFound:
        return None


@auth.verify_password
def verify_password(token, dummy_password):
    user_id = User.verify_auth_token(token)
    # Check if the database found a user with the specified token
    if type(user_id) is int:
        user = session.query(User).filter_by(id=user_id).one()
        g.user = user
        return True
    else:
        return False


@app.route('/token')
def get_auth_token():
    token = g.user.generate_auth_token(expirationDate)
    return jsonify({'token': token.decode('ascii')})


@app.route('/')
@app.route('/catalog')
def showCatalog():
    # Get the category names form database
    categories = set(i[0] for i in session.query(Item.category).all())
    # Get all items created within the allowed
    # time limit to be considered "recent"
    latestItems = session.query(Item).filter(Item.date >= timeLimit).all()
    return render_template('catalog.html', title="Company Catalog",
                           categories=categories, latestItems=latestItems)


@app.route('/<string:category>')
def showCategory(category):
    items = session.query(Item).filter(Item.category == category).all()
    return render_template('category.html', title=category + " Page",
                           items=items)


@app.route('/<int:itemID>')
def showItem(itemID):
    item = session.query(Item).filter(Item.id == itemID).one()
    return render_template('item.html', title=item.name, item=item)


@app.route('/newItem', methods=['GET', 'POST'])
def createItem():
    # Check if user is logged in
    if 'username' not in login_session:
        return redirect(url_for("showLogin"))
    if request.method == 'POST':
        newItem = Item(name=request.form['name'],
                       description=request.form['description'],
                       category=request.form['category'],
                       user_id=login_session['user_id'])
        session.add(newItem)
        session.commit()
        flash('New Item "%s" Added!!!' % newItem.name)
        return redirect(url_for("showCatalog"))
    else:   # request.method == 'GET'
        return render_template('create.html', title="Create new item")


@app.route('/edit/<int:itemID>', methods=['GET', 'POST'])
def editItem(itemID):
    # Check if user is logged in
    if 'username' not in login_session:
        return redirect(url_for("showLogin"))
    itemToBeEdited = session.query(Item).filter(Item.id == itemID).one()
    # Check if user has the permission to edit the item, i.e. he created it
    if login_session['user_id'] != itemToBeEdited.user_id:
        flash("""You are not allowed to edit this item.
create your own item please!""")
        return redirect(url_for("showCatalog"))
    if request.method == 'POST':
        itemToBeEdited.name = request.form['name']
        itemToBeEdited.description = request.form['description']
        itemToBeEdited.category = request.form['category']

        session.add(itemToBeEdited)
        session.commit()
        flash('Item "%s" Edited!!!' % itemToBeEdited.name)
        return redirect(url_for("showCatalog"))
    else:   # request.method == 'GET'
        return render_template('edit.html',
                               titel="Edit " + itemToBeEdited.name,
                               item=itemToBeEdited)


@app.route('/delete/<int:itemID>', methods=['GET', 'POST'])
def deleteItem(itemID):
    # Check if user is logged in
    if 'username' not in login_session:
        return redirect(url_for("showLogin"))
    itemToBeDeleted = session.query(Item).filter(Item.id == itemID).one()
    # Check if user has the permission to delete the item, i.e. he created it
    if login_session['user_id'] != itemToBeDeleted.user_id:
        flash("""You are not allowed to delete this item.
create your own item please!""")
        return redirect(url_for("showCatalog"))
    if request.method == 'POST':
        session.delete(itemToBeDeleted)
        session.commit()
        flash('Item "%s" deleted!!!' % itemToBeDeleted.name)
        return redirect(url_for("showCatalog"))
    else:   # request.method == 'GET'
        return render_template('delete.html',
                               titel="Delete " + itemToBeDeleted.name,
                               item=itemToBeDeleted)


@app.route('/json')
def showCatalogJSON():
    categories = set(i[0] for i in session.query(Item.category).all())
    latestItems = session.query(Item).filter(Item.date >= timeLimit).all()
    return jsonify(Categories=[i for i in categories],
                   LatestItems=[i.serialize for i in latestItems])


@app.route('/<string:category>/json')
def showCategoryJSON(category):
    items = session.query(Item).filter(Item.category == category).all()
    return jsonify(Items=[i.serialize for i in items])


@app.route('/<int:itemID>/json')
def showItemJSON(itemID):
    item = session.query(Item).filter(Item.id == itemID).one()
    return jsonify(Item=item.serialize)


@app.route('/disconnect/json')
def disconnectJSON():
    # Only disconnect a connected user.
    access_token = login_session.get('access_token')
    if access_token is None:
        response = make_response(
            json.dumps('Current user not connected.'), 401)
        response.headers['Content-Type'] = 'application/json'
        return response
    url = 'https://accounts.google.com/o/oauth2/revoke?token=%s' % access_token
    h = httplib2.Http()
    result = h.request(url, 'GET')[0]
    if result['status'] == '200':
        del login_session['gplus_id']
        del login_session['access_token']
        del login_session['username']
        del login_session['email']
        del login_session['picture']
        del login_session['user_id']
        del login_session['provider']
        response = make_response(json.dumps('Successfully disconnected.'), 200)
        response.headers['Content-Type'] = 'application/json'
        return response
    else:
        response = \
            make_response(json.dumps('Failed to revoke token for given user.'),
                          400)
        response.headers['Content-Type'] = 'application/json'
        return response


if __name__ == '__main__':
    app.debug = True
    app.config['SECRET_KEY'] = \
        ''.join(random.
                choice(string.ascii_uppercase + string.digits)
                for x in xrange(32))
    app.run(host='0.0.0.0', port=8000)
