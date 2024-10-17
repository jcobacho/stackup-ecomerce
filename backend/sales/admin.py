from django.contrib import admin
from sales.models import Order

# Register your models here.
# admin.site.register(Order)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id", "client", "shipping_info", "total_amount", "paid"]