from flask import request
from flask_restplus import Resource

from legarda.api.utils.dto import CategoryDto
from legarda.api.services.category_service import CategoryService

api = CategoryDto.api
_category = CategoryDto.category


@api.route('/categories')
class CategoryList(Resource):

    @api.doc('list_of_all_categories')
    @api.marshal_list_with(_category, envelope='data')
    def get(self):
        """List all product categories"""
        return CategoryService.all()

    @api.response(201, 'Category successfully created.')
    @api.doc('create a new product category')
    @api.expect(_category, validate=True)
    def post(self):
        """Creates a new product category """
        data = request.json
        return CategoryService.add_category(data=data)


@api.route('/categories/<name>')
@api.param('name', 'Category name')
@api.response(404, 'category not found.')
class Category(Resource):

    @api.doc('get a product category')
    @api.marshal_with(_category)
    def get(self, name):
        """get a product category given its name"""
        category = CategoryService.get_by_name(name)
        if not category:
            api.abort(404)
        else:
            return category
