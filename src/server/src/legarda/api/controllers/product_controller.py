from flask import request
from flask_restplus import Resource

from legarda.api.utils.dto import ProductDto
from legarda.api.services.product_service import ProductService

api = ProductDto.api
_product = ProductDto.product


@api.route('/products')
class ProductList(Resource):

    @api.doc('list_of_all_products')
    @api.marshal_list_with(_product, envelope='data')
    def get(self):
        """List all products"""
        return ProductService.all()

    @api.response(201, 'product successfully created.')
    @api.doc('create a new product')
    @api.expect(_product, validate=True)
    def post(self):
        """Creates a new product category """
        data = request.json
        return ProductService.add_product(data=data)


@api.route('/products/<name>')
@api.param('name', 'product name')
@api.response(404, 'product not found.')
class Product(Resource):

    @api.doc('get a product')
    @api.marshal_with(_product)
    def get(self, name):
        """get a product given its name"""
        product = ProductService.get_by_name(name)
        if not product:
            api.abort(404)
        else:
            return product
