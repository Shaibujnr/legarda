from flask_restplus import Api
from flask import Blueprint

from legarda.api.controllers.user_controller import api as user_namespace
from legarda.api.controllers.auth_controller import api as auth_namespace
from legarda.api.controllers.category_controller import api as category_namespace
from legarda.api.controllers.product_controller import api as product_namespace

blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='LEGARDA API WITH JWT',
          version='1.0',
          description='legarda api built on flask for sharing farm products',
          doc='/docs'
        )

api.add_namespace(user_namespace)
api.add_namespace(auth_namespace)
api.add_namespace(category_namespace)
api.add_namespace(product_namespace)

__version__ = '0.1.0'
