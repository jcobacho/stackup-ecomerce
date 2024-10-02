from django.contrib import admin
from inventory.models import Category, Product
# Register your models here.
# @admin.register(Category)
admin.site.register(Category)
admin.site.register(Product)
