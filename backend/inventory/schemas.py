from inventory.models import Product
from ninja import Schema
from decimal import Decimal
from typing import Optional

class CategorySchema(Schema):
    id: int
    name: str
    
class ProductSchema(Schema):
    id: int
    name: str
    image_url: str
    price: float
    category: Optional[CategorySchema] = None  # ! None - to mark it as optional
