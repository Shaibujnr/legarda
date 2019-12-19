import os
import unittest

from dotenv import load_dotenv
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager


basedir = os.path.abspath(os.path.dirname(__file__))
rootdir = os.path.abspath(os.path.join(basedir, os.pardir, os.pardir))

APP_ENV = os.getenv('APP_ENV', 'dev')
ENV_FILENAME = '.env.%s'%APP_ENV
ENV_FILEPATH = os.path.abspath(os.path.join(rootdir, ENV_FILENAME))

load_dotenv(dotenv_path=ENV_FILEPATH)

from legarda.api import create_app, db
from legarda.api.models import *
from legarda import blueprint

app = create_app(APP_ENV)
app.register_blueprint(blueprint, url_prefix="/api/v1")
app.app_context().push()

manager = Manager(app)

migrate = Migrate(app, db)

manager.add_command('db', MigrateCommand)


@manager.option('-fn', '--firstName', dest='first_name', default=None)
@manager.option('-ln', '--lastName', dest='last_name', default=None)
@manager.option('-e', '--email', dest='email', default=None)
@manager.option('-u', '--username', dest='username', default=None)
@manager.option('-p', '--password', dest='password', default=None)
def create_admin_user(first_name, last_name, email, username, password):
    if first_name is None or last_name is None or email is None or username is None or password is None:
        print('You must provide user firstname, lastname, email, username and password')
        return
    if len(password) < 6:
        print('Password must be at least 6 characters long')
        return
    user: User = User(
        first_name, 
        last_name, 
        email, 
        username,
        password,
        admin=True
    )
    db.session.add(user)
    db.session.commit()

@manager.command
def run():
    app.run()


if __name__ == '__main__':
    manager.run()
