from django.db import models
from django.utils.translation import gettext_lazy as _
from inventory.models import Product
from django.db.models import Sum, F

from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.


class ShippingInfo(models.Model):

    name = models.CharField(verbose_name=_("Name"), max_length=255)
    email_address = models.CharField(verbose_name=_("Email Address"), max_length=255)
    address = models.CharField(verbose_name=_("Address"),  max_length=255)
    zipcode = models.CharField(verbose_name=_("Zip Code"), max_length=255)
    city = models.CharField(verbose_name=_("City"), max_length=255)
    country = models.CharField(verbose_name=_("Country"), max_length=255)
       
    class Meta:
        verbose_name = _("Shipping Info")
        verbose_name_plural = _("Shipping Info")
       
    def __str__(self) -> str:
        return f"{self.name} {self.address} {self.city} {self.country} {self.zipcode}"    

class Order(models.Model):

    paid = models.BooleanField(default=False)

    client = models.ForeignKey(User, verbose_name=_("Client"), on_delete=models.CASCADE)
    shipping_info = models.ForeignKey(ShippingInfo, verbose_name=_("Shipping Info"), on_delete=models.SET_NULL, null=True)
    
    class Meta:
        verbose_name = _("Order")
        verbose_name_plural = _("Orders")
       
    def __str__(self) -> str:
        return str(self.id) + " " + self.client.__str__()

    @property
    def total_amount(self):
        return self.orderitem_set.all().aggregate(total=Sum(F('qty') * F('price'))).get('total', 0)
        
    @property
    def total_quantity(self):
        return self.orderitem_set.all().aggregate(total=Sum('qty')).get('total', 0)

class OrderItem(models.Model):

    name = models.CharField(verbose_name=_("Name"), max_length=255, null=True)
    order = models.ForeignKey(Order, verbose_name=_("Order"), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, verbose_name=_("Product"), on_delete=models.CASCADE)

    price = models.FloatField()
    qty = models.IntegerField(default=0)
        
    class Meta:
        verbose_name = _("Order Item")
        verbose_name_plural = _("Order Items")
       
    def __str__(self) -> str:
        return str(self.order.id) + self.short_name    

    @property
    def short_name(self)  -> str:
        return self.name or self.product.name if self.product else ""

    @property
    def image_url(self) -> str:
        return self.product.image_url if self.product else ""


