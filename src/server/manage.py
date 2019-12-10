import os
import unittest

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

from legarda.api import create_app, db

from legarda.api.models.dummy import Dummy

app = create_app(os.getenv('APP_ENV') or 'dev')

app.app_context().push()

manager = Manager(app)

migrate = Migrate(app, db)

manager.add_command('db', MigrateCommand)

@manager.command
def run():
    app.run()


if __name__ == '__main__':
    manager.run()
