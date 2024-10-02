from inventory.models import Product
from ninja import Schema


class CategorySchema(Schema):
    id: int
    name: str
    
class ProductSchema(Schema):
    id: int
    name: str
    category: CategorySchema = None  # ! None - to mark it as optional
