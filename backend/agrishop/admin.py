from django.contrib import admin
from .models import Seller,Buyer,Products,Cartitems
# Register your models here.

admin.site.register(Seller)
admin.site.register(Buyer)
admin.site.register(Products)
admin.site.register(Cartitems)