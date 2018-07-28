# Udacity-Project5-Submission

* IP-Address of the Server: 18.196.124.236
* SSH-Port: 2200
* URL: http://18.196.124.236.xip.io/
note: you must use the DNS top-level-domain so that OAuth works properly

## Summery of the Software used and third party resources:
1. Apache2 Server
2. WSGI mod for Apache
3. the core application is written in python 2
4. Microframework used is FLASK
5. Database used PostgreSQL
5. Libraries: SQLAlchemy (ORM), flask_httpauth, Requests, passlib, psycobg2, oauth2client, httplib2
6. Tools: pip, git

## Summery of configurations made:
1. updated the system and packages with apt-get and aptitude:
    e.g.:
      sudo apt-get update/upgrade
      suod aptitude update/sage-upgrade
2. Added and configured a new user grader with sudo permission
    e.g.:
      sudo adduser grader
      then modified the file in /etc/sudoers.d/grader "grader ALL=(ALL:ALL) ALL"
      generated and ssh key pair with ssh-keygen and installed it on /home/grade/.ssh/authorized_keys
3. Configured SSH over port 2200 and enforced SSH authentication
    e.g.:
      sudo nano /etc/ssh/sshd_config (changed the port from 22 to 2200)
      denied root login and forced ssh login (set PermitRootLogin and PasswordAuthentication to no)
4. Configured UFW to only allow communications on port 80,2200,123
    e.g.:
      sudo ufw default deny incoming
      sudo ufw default allow outgoing
      sudo ufw allow 2200/tcp
      sudo ufw allow www
      sudo ufw allow ntp
      sudo ufw enable
     
5. installed PostgreSQL and cnofigured it correctly:
    e.g.:
      sudo apt-get install postgresql
      sudo -i -u postgres
      createuser --interactive -P
      CREATE DATABASE catalog;

6. installe third party resources and needed libraries:
    e.g.:
      sudo apt-get install git
      sudo apt-get install python-psycopg2
      sudo apt-get install python-flask
      sudo apt-get install python-sqlalchemy
      sudo apt-get install python-pip
      sudo pip install bleach
      sudo pip install flask-seasurf
      sudo pip install github-flask
      sudo pip install httplib2
      sudo pip install oauth2client
      sudo pip install requests

7. installed and configured apache2:
    e.g.:
      sudo apt-get install apache2
      sudo apt-get install libapache2-mod-wsgi
      created myapp.wsgi
      and modified /etc/apache2/sites-enabled/000-default.conf
      restarted the apache2 service
      
## List of installed Software:

    Apache2
    PostgreSQL
    bleach
    flask-seasurf
    git
    github-flask
    httplib2
    libapache2-mod-wsgi
    oauth2client
    python-flask
    python-pip
    python-psycopg2
    python-sqlalchemy
    requests
