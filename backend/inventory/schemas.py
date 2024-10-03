from inventory.models import Product
from ninja import Schema
from decimal import Decimal

class CategorySchema(Schema):
    id: int
    name: str
    
class ProductSchema(Schema):
    id: int
    name: str
    image_url: str
    price: float
    category: CategorySchema = None  # ! None - to mark it as optional
