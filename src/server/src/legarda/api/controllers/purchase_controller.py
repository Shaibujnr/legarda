from flask import request
from flask_restplus import Resource

from legarda.api.utils.dto import PurchaseDto
from legarda.api.services.purchase_service import PurchaseService

api = PurchaseDto.api
_purchase = PurchaseDto.purchase


@api.route('/purchases')
class PurchaseList(Resource):

    @api.doc('list_of_all_purchases')
    @api.marshal_list_with(_purchase, envelope='data')
    def get(self):
        """List all purchases"""
        return PurchaseService.all()

    @api.response(201, 'purchase successfully created.')
    @api.doc('start a new purchase')
    @api.expect(_purchase, validate=True)
    def post(self):
        """Starts a new product purchase """
        data = request.json
        return PurchaseService.start_purchase(data=data)


@api.route('/purchases/<int:purchase_id>')
@api.param('purchase_id', 'purchase id')
@api.response(404, 'purchase not found.')
class Purchase(Resource):

    @api.doc('get a product')
    @api.marshal_with(_purchase)
    def get(self, purchase_id):
        """get a purchase by it's id"""
        purchase = PurchaseService.get(purchase_id)
        if not purchase:
            api.abort(404)
        else:
            return purchase
