from django.db import models
from django.utils.translation import gettext_lazy as _
from inventory.models import Product
from django.db.models import Sum, F

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

    @property
    def total_amount(self):
        t = self.orderitem_set.all().aggregate(total=Sum(F('qty') * F('price')))
        dir("t")
        dir(t)
        return t['total']

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
        return self.order.id + self.product.name    

    @property
    def short_name(self)  -> str:
        return self.name or self.product.name if self.product else ""

    @property
    def image_url(self) -> str:
        return self.product.image_url if self.product else ""