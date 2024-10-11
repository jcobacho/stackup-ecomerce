from django.db import models
from django.utils.translation import gettext_lazy as _


# Create your models here.
class Category(models.Model):

    name = models.CharField(max_length=255, verbose_name=_("Name"))
    
    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")
       
    def __str__(self) -> str:
        return self.name

class Product(models.Model):

    name = models.CharField(max_length=255, verbose_name=_("Name"))
    description = models.TextField(blank=True, verbose_name=_("Description"))
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.SET_NULL)
    image_url = models.TextField(null=True, blank=True, verbose_name=_("Image"))

    price = models.FloatField(null=True, blank=True, verbose_name=_("Price"))
    class Meta:
        verbose_name = _("Product")
       
    def __str__(self) -> str:
        return self.name

    @property
    def is_new():
        pass