from legarda.api import db, flask_bcrypt
from sqlalchemy.sql import func
from .helper import users_purchases

class User(db.Model):
    """ User Model for storing user related details """

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    admin = db.Column(db.Boolean, nullable=False, default=False)
    username = db.Column(db.String(50), unique=True)
    password_hash = db.Column(db.String(100))
    is_email_verified = db.Column(db.Boolean, nullable=False, default=False)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    registered_on = db.Column(db.DateTime, nullable=False, default=func.now())
    purchases = db.relationship('Purchase', backref='owner', lazy=True)
    shared_purchases = db.relationship('Purchase', secondary=users_purchases, lazy='subquery',
        backref=db.backref('shared_users', lazy=True))

    def __init__(self, first_name, last_name, email, username, password, admin=False):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.username = username
        self.password = password
        self.admin = admin

    @property
    def password(self):
        raise AttributeError('password: write-only field')

    @password.setter
    def password(self, password):
        self.password_hash = flask_bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return flask_bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return "<User '{}'>".format(self.username)
