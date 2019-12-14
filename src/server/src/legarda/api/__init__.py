from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from legarda.api.config import config_by_name

db = SQLAlchemy()
flask_bcrypt = Bcrypt()
jwt = JWTManager()
cors = CORS()

from legarda.api.models import BlacklistToken

@jwt.token_in_blacklist_loader
def is_token_blacklisted(data):
    return BlacklistToken.is_blacklisted(data['jti'])


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])
    cors.init_app(app)
    db.init_app(app)
    flask_bcrypt.init_app(app)
    jwt.init_app(app)

    return app
