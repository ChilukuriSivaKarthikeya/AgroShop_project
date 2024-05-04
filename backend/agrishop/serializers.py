from rest_framework import serializers 
from django.contrib.auth.models import User 
from .models import Seller,Buyer,Products,Cartitems,Wishlist,Order, OrderItem, ShippingAddress
from rest_framework_simplejwt.tokens import RefreshToken  

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name','password']
  
class BuyerSerializer(serializers.ModelSerializer):
    user = UserSerializer()  
    class Meta:  
        model = Buyer  
        fields ='__all__'   

class SellerSerializer(serializers.ModelSerializer):  
    class Meta:  
        model = Seller  
        fields = '__all__'

class ProductsSerializer(serializers.ModelSerializer):  
    class Meta:  
        model = Products  
        fields ='__all__'

class WishlistSerializer(serializers.ModelSerializer):
    product = ProductsSerializer()
    user = UserSerializer() 
    class Meta:
        model = Wishlist
        fields = '__all__'

class CartitemsSerializer(serializers.ModelSerializer): 
    product = ProductsSerializer()
    user = UserSerializer() 
    class Meta:  
        model = Cartitems  
        fields = ('__all__')  
    
class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductsSerializer()  
    class Meta:
        model = OrderItem
        fields = '__all__'  

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__' 
        

class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    totalPrice = serializers.DecimalField(max_digits=7, decimal_places=2)
    class Meta:
        model = Order
        fields = ['id', 'user', 'totalPrice', 'created_at', 'isPaid', 'status', 'paymentmethod', 'orderItems', 'shippingAddress']

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        shipping_addresses = obj.shippingaddress_set.all()
        address = ShippingAddressSerializer(shipping_addresses, many=True).data
        return address
