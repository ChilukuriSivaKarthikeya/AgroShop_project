from django.contrib.auth.models import User
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response  
from rest_framework import status  
from .models import Seller,Buyer,Products,Cartitems,Wishlist,Order, OrderItem, ShippingAddress 
from .serializers import SellerSerializer,BuyerSerializer,ProductsSerializer,CartitemsSerializer,UserSerializer,WishlistSerializer,OrderSerializer,OrderItemSerializer,ShippingAddressSerializer 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text
from django.core.mail import send_mail
from django.utils.html import format_html
from django.http import JsonResponse
from django.conf import settings
from bson import Decimal128
from django.core import serializers
import razorpay
import random

stored_otp = ''
stored_user_email = ''

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data
    global stored_otp,stored_user_email
    stored_otp = data['otp']
    stored_user_email = data['email']

    if data['email'] != stored_user_email or data['otp'] != stored_otp:
        return Response({'error': 'Invalid OTP or email'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
            user = User.objects.create(
                first_name=data['name'],
                username=data['email'],
                email=data['email'],
                password=make_password(data['password']),
            )
            
            Buyer.objects.create(
                user=user,
                mobile="",
                village="",
                pincode="",
            )
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception:
            return Response({'error': 'User with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def sendOTP(request):
    user_email = request.data.get('email')
    if user_email:
        otp = ''.join(random.choice('0123456789') for _ in range(4))
        global stored_otp,stored_user_email
        stored_otp=otp
        stored_user_email=user_email
        email_subject = 'Verification Code'
        email_body = f'''
            <html>
            <body>
            <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
                <div style="margin: 50px auto; width: 70%; padding: 20px 0">
                    <div style="border-bottom: 1px solid #eee">
                        <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600">Farmshop</a>
                    </div>
                    <p style="font-size: 1.1em">Hi user,</p>
                    <p style="font-size: 0.9em">Please use the verification code below to Register.</p>
                    <h2 style="background: #00466a; margin: 0 50px; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">{otp}</h2>
                    <p style="font-size: 0.9em">If you didn't request this, you can ignore this email.</p>
                    <hr style="border: none; border-top: 1px solid #eee" />
                    <p style="font-size: 0.9em;">Regards,<br />Team FarmShop</p>
                </div>
            </div>
            </body>
            </html>
        '''

        try:
            send_mail(
                email_subject,
                '', 
                'blooddonationsystemteam@gmail.com',
                [user_email],
                html_message=email_body,  
                fail_silently=False,
            )
            return Response({'message': 'OTP sent successfully'}, status=200)
        except Exception as e:
            return Response({'error': 'Failed to send OTP'}, status=500)
    else:
        return Response({'error': 'Email is required'}, status=400)


@api_view(['GET']) 
@permission_classes([IsAuthenticated])
def getBuyer(request):
    user = request.user
    try:
        buyer = Buyer.objects.select_related('user').get(user=user)
        serializer = BuyerSerializer(buyer, many=False)
        return Response(serializer.data)
    except Buyer.DoesNotExist:
        return Response({'detail': 'Buyer not found for this user.'}, status=404)

@api_view(['POST']) 
def sendLink(request):
        email = request.data['email']
        user = get_user_model().objects.filter(email=email).first()

        if user:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            reset_link = f"http://localhost:3000/confirmresetpassword/{uid}/{token}"

            email_subject = 'Password Reset'
            email_body = format_html(
                '<html><body>'
                '<h1 style="color: #007bff;">Password Reset</h1>'
                '<p>Hello,</p>'
                '<p>Use the following link to reset your password:</p>'
                f'<a href="{reset_link}" style="background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Reset Password</a>'
                '</body></html>'
            )

            send_mail(
                email_subject,
                '',
                'blooddonationsystemteam@gmail.com',
                [email],
                html_message=email_body,
                fail_silently=False,
            )

            return Response({'message': f'Password reset link sent to {email}'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User with this email not found.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST']) 
def resetPasswordConfirm(request, uidb64, token):
    try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = get_user_model().objects.get(id=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

    if user and default_token_generator.check_token(user, token):
            password = request.data['password']
            user.set_password(password)
            user.save()
            return Response({'message': 'Password reset successful.'}, status=status.HTTP_200_OK)
    else:
            return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    buyer = Buyer.objects.get(id=pk)
    data = request.data
    buyer.user.first_name = data['name']
    buyer.mobile = data['mobile']
    buyer.village = data['village']
    buyer.pincode = data['pincode']
    buyer.user.save()
    buyer.save()

    serializer = BuyerSerializer(buyer, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserImage(request, pk):
    user =Buyer.objects.get(id=pk)
    data = request.data
    user.image = data['image']
    user.save()
    serializer = BuyerSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getProducts(request):
    data =Products.objects.all()  
    serializers = ProductsSerializer(data, many=True)  
    return Response(serializers.data, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getWishlist(request):
    user = request.user
    wishlist= Wishlist.objects.filter(user=user)
    serializer = WishlistSerializer(wishlist, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addWishlist(request,pk):
    user = request.user
    product = Products.objects.get(id=pk)
    if not Wishlist.objects.filter(user=user, product=product).exists():
        wishlist = Wishlist.objects.create(user=user,product=product)
        serializer = WishlistSerializer(wishlist)
        return Response({"message": "Product added to wishlist successfully"}, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Product is already in the wishlist."}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeWishlist(request,pk):
    try:
        product = Products.objects.get(id=pk)
        data = Wishlist.objects.get(product=product)
        data.delete()
        return Response({"message": "Product removed from Wishlist successfully"}, status=status.HTTP_200_OK)
    except Wishlist.DoesNotExist:
        return Response({"message": "Wishlist item not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCart(request):
    user = request.user
    cart= Cartitems.objects.filter(user=user)
    serializer = CartitemsSerializer(cart, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCart(request,pk):
    user = request.user
    product = Products.objects.get(id=pk)
    if not Cartitems.objects.filter(user=user, product=product).exists():
        Cartitems.objects.create(user=user,product=product)
        return Response({"message": "Product added to Cart successfully"}, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Product is already in the cart."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeCart(request,pk):
    try:
        product = Products.objects.get(id=pk)
        data = Cartitems.objects.get(product=product, user=request.user)
        data.delete()
        return Response({"message": "Product removed from Cart Successfully"}, status=status.HTTP_200_OK)
    except Cartitems.DoesNotExist:
        return Response({"message": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def increaseQuantity(request,pk):
    product=Products.objects.get(id=pk)
    cart= Cartitems.objects.get(product=product)
    cart.quantity+=1
    cart.save()
    return Response("sucess")

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def decreaseQuantity(request,pk):
    product=Products.objects.get(id=pk)
    cart= Cartitems.objects.get(product=product)
    cart.quantity-=1
    cart.save()
    return Response("sucess")            

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders =  Order.objects.filter(user=user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):
    user = request.user
    cart_items = Cartitems.objects.filter(user=user)
    data = request.data 
    order = Order.objects.create(user=user,totalPrice=data['total'],isPaid=bool(data['paid']),paymentmethod=data['paymentmethod'])

    shipping_address = ShippingAddress.objects.create(
            order=order,
            firstName=data['addressData']['firstName'],
            lastName=data['addressData']['lastName'],
            mobile=data['addressData']['mobile'],
            addressLine=data['addressData']['address'],
            city=data['addressData']['village'],
            state=data['addressData']['state'],
            pincode=data['addressData']['pincode'],
        )
    
    for cart_item in cart_items:
            price=(float(str(cart_item.product.price))-cart_item.product.discount/100)* cart_item.quantity
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                item_price=price,
            )
            product=Products.objects.get(id=cart_item.product.id)
            product.quantity -= cart_item.quantity
            product.save()
    cart_items.delete()  
    return Response('order placed successfully')

def create_order(request):
    amount=float(request.GET.get('amount'))
    client = razorpay.Client(auth=(settings.RAZORPAY_API_KEY, settings.RAZORPAY_API_SECRET))
    
    data = {
        'amount': 100*amount,
        'currency': 'INR',
        'payment_capture': 1  
    }
    order = client.order.create(data=data)
    return JsonResponse(order)

@api_view(['POST'])
def registerSeller(request):
    data = request.data
    global stored_otp,stored_user_email
    stored_otp = data['otp']
    stored_user_email = data['email']
    print(stored_otp)

    if data['email'] != stored_user_email or data['otp'] != stored_otp:
        return Response({'error': 'Invalid OTP or email'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
            user = User.objects.create(
                first_name=data['name'],
                username=data['email'],
                email=data['email'],
                password=make_password(data['password']),
            )
            
            Seller.objects.create(
                user=user,
                mobile="",
                village="",
                pincode="",
            )
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception:
            return Response({'error': 'User with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET']) 
@permission_classes([IsAuthenticated])
def getSeller(request):
    user = request.user
    try:
        seller = Seller.objects.select_related('user').get(user=user)
        serializer = SellerSerializer(seller, many=False)
        return Response(serializer.data)
    except Seller.DoesNotExist:
        return Response({'detail': 'seller not found for this user.'}, status=404)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateSeller(request, pk):
    seller = Seller.objects.get(id=pk)
    data = request.data
    seller.user.first_name = data['name']
    seller.mobile = data['mobile']
    seller.village = data['village']
    seller.pincode = data['pincode']
    seller.user.save()
    seller.save()

    serializer = SellerSerializer(seller, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateSellerImage(request, pk):
    user =Seller.objects.get(id=pk)
    data = request.data
    user.image = data['image']
    user.save()
    serializer = SellerSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyProducts(request):
    user = request.user
    seller=Seller.objects.get(user=user)
    products =  Products.objects.filter(seller=seller)
    serializer = ProductsSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyorders(request):
    user = request.user
    seller = Seller.objects.get(user=user)
    seller_products = Products.objects.filter(seller=seller)
    order_items = OrderItem.objects.filter(product__in=seller_products)
    orders = Order.objects.filter(orderitem__in=order_items).distinct()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderStatus(request,id):
    order = Order.objects.get(id=id)
    order.status=request.data['status']
    order.save()
    return Response("status updated succesfully",status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProduct(request):
    user = request.user
    try:
        seller = Seller.objects.get(user=user)
    except Seller.DoesNotExist:
        return Response({"error": "Seller does not exist for this user"}, status=status.HTTP_404_NOT_FOUND)
    data = request.data
    product = Products.objects.create(
        seller=seller,
        name=data['name'],
        category=data['category'],
        quantity=data['quantity'],
        price=data['price'],
        discount=data['discount'],
        location=data.getlist('location'),
        image=data.get('image')
    )

    serializer = ProductsSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProduct(request,id):
    product=Products.objects.get(id=id)
    serializer = ProductsSerializer(product)
    return Response(serializer.data)

@api_view(['PUT'])
def updateProduct(request,id):
    data = request.data
    product = Products.objects.get(id=id)
    product.name = data['name']
    product.category = data['category']
    product.price = data['price']
    product.quantity = data['quantity']
    product.location = data.getlist('location')
    product.save()
    serializer = ProductsSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteProduct(request,id):
    product = Products.objects.get(id=id)
    product.delete()
    return Response('Producted Deleted')
