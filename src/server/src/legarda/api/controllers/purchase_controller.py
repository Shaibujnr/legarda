from flask import request
from flask_restplus import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from legarda.api.utils.dto import PurchaseDto
from legarda.api.services.purchase_service import PurchaseService

api = PurchaseDto.api
_purchase = PurchaseDto.purchase
parser = api.parser()
parser.add_argument('Authorization', location='headers', required=True)
# parser.add_argument('id', type=int, location='json')
# parser.add_argument('productId', required=True, type=int, location='json')
# parser.add_argument('paid', type=float, location='json')
# parser.add_argument('count', type=int)
# parser.add_argument('status', type=str)
# _purchase = PurchaseDto.purchase

# parser = api.parser()
# parser.add_argument('Authorization', location='headers', required=True)


@api.route('/purchases')
class PurchaseList(Resource):

    @api.doc('list_of_all_purchases')
    @api.marshal_list_with(_purchase, envelope='data')
    def get(self):
        """List all purchases"""
        return PurchaseService.all()

    @api.response(201, 'purchase successfully created.')
    @api.doc('start a new purchase')
    @api.expect(_purchase, parser, validate=True)
    @jwt_required
    def post(self):
        """Starts a new product purchase """
        data = request.json
        owner_id = get_jwt_identity()
        return PurchaseService.start_purchase(owner_id=owner_id, data=data)


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
