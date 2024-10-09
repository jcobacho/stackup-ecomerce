from ninja_extra import NinjaExtraAPI, api_controller, http_get
from ninja_jwt.controller import NinjaJWTDefaultController
from inventory.api import ProductsController
from authapi.api import UserModelController

api = NinjaExtraAPI()

api.register_controllers(NinjaJWTDefaultController)

api.register_controllers(
    ProductsController,
    UserModelController
)
