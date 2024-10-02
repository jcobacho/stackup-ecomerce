from ninja import Router
from inventory.models import Product
from ninja.pagination import paginate
from typing import List
from inventory.schemas import ProductSchema
from api.pagination import MyPagination

router = Router()

@router.get('/products', response=List[ProductSchema], )
@paginate(MyPagination)
def list_directories(request, q: str = '', **kwargs):
    queryset = Product.objects.filter(name__icontains=q).select_related('category')
    return list(queryset)