from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User

class Buyer(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to="images",default='images/profile.jpg')
    mobile=models.CharField(max_length=12)
    village=models.CharField(max_length=20)
    pincode=models.CharField(max_length=20)

class Seller(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to="images",default='images/profile.jpg')
    mobile=models.CharField(max_length=12)
    village=models.CharField(max_length=20)
    pincode=models.CharField(max_length=20)

class Products(models.Model):
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE)
    image=models.ImageField(upload_to="images")
    name=models.CharField(max_length=40)
    category=models.CharField(max_length=40)
    price=models.IntegerField()
    discount=models.IntegerField()
    quantity=models.IntegerField()
    location=models.JSONField()
    

class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)

class Cartitems(models.Model):
    user= models.ForeignKey(User, on_delete=models.CASCADE)
    product= models.ForeignKey(Products, on_delete=models.CASCADE)
    quantity=models.IntegerField(default=1)

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    totalPrice = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    isPaid = models.BooleanField(default=False)
    status = models.CharField(max_length=40,default="placed")
    paymentmethod = models.CharField(max_length=40)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    item_price = models.DecimalField(max_digits=7, decimal_places=2, default=0.0)

class ShippingAddress(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    firstName=models.CharField(max_length=50, null=True, blank=True)
    lastName=models.CharField(max_length=50, null=True, blank=True)
    mobile=models.CharField(max_length=20, null=True, blank=True)
    addressLine = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=50, null=True, blank=True)
    state=models.CharField(max_length=50, null=True, blank=True)
    pincode = models.CharField(max_length=50, null=True, blank=True)
