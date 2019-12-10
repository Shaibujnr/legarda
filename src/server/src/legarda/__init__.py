from flask_restplus import Api
from flask import Blueprint

from legarda.api.controllers.user_controller import api as user_namespace

blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='LEGARDA API WITH JWT',
          version='1.0',
          description='legarda api built on flask for sharing farm products',
          doc='/docs'
          )

api.add_namespace(user_namespace)


__version__ = '0.1.0'
