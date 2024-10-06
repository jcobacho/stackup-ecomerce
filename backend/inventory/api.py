from ninja import Router
from inventory.models import Product
from ninja.pagination import paginate
from typing import List
from inventory.schemas import ProductSchema
from api.pagination import MyPagination

import uuid
from ninja import ModelSchema
from ninja_extra import (
    http_get, http_post, http_generic, http_delete,
    api_controller, status, ControllerBase, pagination
)
from ninja_extra.controllers.response import Detail
from inventory.models import Product
from ninja_extra import permissions
from ninja_jwt.authentication import JWTAuth

@api_controller('/products')
class ProductsController(ControllerBase):
    product_model = Product

    # @http_post()
    # def create_user(self, product: ProductSchema):
    #     # just simulating created user
    #     return dict(id=uuid.uuid4())

    # @http_generic('/{int:user_id}', methods=['put', 'patch'], response=ProductSchema)
    # def update_user(self, user_id: int):
    #     """ Django Ninja will serialize Django ORM model to schema provided as `response`"""
    #     user = self.get_object_or_exception(self.user_model, id=user_id)
    #     return user

    # @http_delete('/{int:user_id}', response=Detail(status_code=status.HTTP_204_NO_CONTENT))
    # def delete_user(self, user_id: int):
    #     user = self.get_object_or_exception(self.user_model, id=user_id)
    #     user.delete()
    #     return self.create_response('', status_code=status.HTTP_204_NO_CONTENT)

    @http_get("", response=pagination.PaginatedResponseSchema[ProductSchema], auth=JWTAuth())
    @pagination.paginate(pagination.PageNumberPaginationExtra)
    def list_products(self):
        return self.product_model.objects.select_related('category')

    @http_get('/{product_id}', response=ProductSchema)
    def get_product_by_id(self, product_id: int):
        product = self.get_object_or_exception(self.product_model, id=product_id)
        return product


