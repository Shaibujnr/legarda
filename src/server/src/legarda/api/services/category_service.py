from legarda.api import db
from legarda.api.models import Category


class CategoryService:

    @staticmethod
    def add_category(data):
        """
        Creates and adds a new product category
        """
        try:
            category = Category.query.filter_by(name=data['name']).first()
            if not category:
                new_category: Category = Category(data['name'])
                db.session.add(new_category)
                db.session.commit()
                response_object = {
                    'status': 'success',
                    'data': {
                        'id': new_category.id,
                        'name': new_category.name
                    }
                }
                return response_object, 201
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'Category already exists'
                }
                return response_object, 400
        except Exception as e:
            response_object = {
                    'status': 'fail',
                    'message': e
            }
            return response_object, 400

    @staticmethod
    def all():
        """
        Fetches all categories
        """
        return Category.query.all()

    @staticmethod
    def get_by_name(name: str):
        """
        Fetches a single category by name
        """
        return Category.query.filter_by(name=name).first()
