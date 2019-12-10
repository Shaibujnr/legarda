import os
import unittest

from dotenv import load_dotenv
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

from legarda.api import create_app, db
from legarda.api.models import User
from legarda import blueprint

basedir = os.path.abspath(os.path.dirname(__file__))
rootdir = os.path.abspath(os.path.join(basedir, os.pardir, os.pardir))


APP_ENV = os.getenv('APP_ENV', 'dev')
ENV_FILENAME = '.env.%s'%APP_ENV
ENV_FILEPATH = os.path.abspath(os.path.join(rootdir, ENV_FILENAME))

load_dotenv(dotenv_path=ENV_FILEPATH)

app = create_app(APP_ENV)
app.register_blueprint(blueprint, url_prefix="/api/v1")
app.app_context().push()

manager = Manager(app)

migrate = Migrate(app, db)

manager.add_command('db', MigrateCommand)

@manager.command
def run():
    app.run()


if __name__ == '__main__':
    manager.run()
