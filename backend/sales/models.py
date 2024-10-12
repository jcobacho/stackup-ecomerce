from django.db import models
from django.utils.translation import gettext_lazy as _
from inventory.models import Product

from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.
class Order(models.Model):

    client = models.ForeignKey(User, verbose_name=_("Client"), on_delete=models.CASCADE)
    paid = models.BooleanField(default=False)
    
    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")
       
    def __str__(self) -> str:
        return self.name

class OrderItem(models.Model):

    order = models.ForeignKey(Order, verbose_name=_("Name"), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, verbose_name=_("Name"), on_delete=models.CASCADE)

    price = models.FloatField()
    qty = models.IntegerField(default=0)
    
    
    class Meta:
        verbose_name = _("Order Item")
        verbose_name_plural = _("Order Items")
       
    def __str__(self) -> str:
        return self.order.id + self.product.name