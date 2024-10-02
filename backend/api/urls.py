from ninja import NinjaAPI

api = NinjaAPI()
api.add_router("/inventory/", "inventory.api.router")    # You can add a router as an object