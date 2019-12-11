from legarda.api import db
from legarda.api.models import Product, Category

class ProductService:

    @staticmethod
    def add_product(data):
        """
        Creates and adds a new product
        """
        try:
            product = Product.query.filter_by(name=data['name']).first()
            if not product:
                new_product = Product(
                    data['name'], 
                    data['price'], 
                    data.get('location'),
                    data.get('count'), 
                    data.get('manufacturer')
                )
                category_ids = data['categories']
                for category_id in category_ids:
                    category = Category.query.get(category_id)
                    new_product.categories.append(category)
                db.session.add(new_product)
                db.session.commit()
                response_object = {
                    'status': 'success',
                    'data': {
                        'id': new_product.id,
                        'name': new_product.name,
                        'location': new_product.location,
                        'price': new_product.price,
                        'count': new_product.count,
                        'manufacturer': new_product.manufacturer,
                        'dateCreated': str(new_product.date_created),
                        'is_available': new_product.is_available
                    }
                }
                return response_object, 201
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'Product already exists'
                }
                return response_object, 400
        except Exception as e:
            print('\n\n')
            print(e)
            response_object = {
                    'status': 'fail',
                    'message': str(e)
            }
            return response_object, 400

    @staticmethod
    def all():
        """
        Fetches all products
        """
        return Product.query.all()

    @staticmethod
    def get_by_name(name: str):
        """
        Fetches a single product by name
        """
        return Product.query.filter_by(name=name).first()

    @staticmethod
    def get_categories(identity):
        if(isinstance(identity, int)):
            product = Product.query.get(identity)
        else:
            product = Product.query.filter_by(name=identity).first()
        return product.categories
