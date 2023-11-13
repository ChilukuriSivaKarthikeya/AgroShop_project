from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(), name ='token_refresh'),
    path('register/', views.registerUser, name='register'),
    path('sendOTP/', views.sendOTP, name='sendOTP'),
    path('update/<int:pk>', views.updateUser, name='update'),
    path('updateimage/<int:pk>', views.updateUserImage, name='updateimage'),
    path('buyer/', views.getBuyer, name='buyer'),

    path('passwordreset/', views.sendLink, name='password-reset'),
    path('passwordresetconfirm/<str:uidb64>/<str:token>/', views.resetPasswordConfirm, name='password-reset-confirm'),

    path('createproduct/', views.createProduct, name='createproduct'),
    path('products/', views.getProducts, name='getproducts'),
    path('updateproduct/<int:id>', views.updateProduct, name='updateproduct'),
    path('deleteproduct/<int:id>', views.deleteProduct, name='deleteproduct'),
    
    path('wishlist/', views.getWishlist, name='getwishlist'),
    path('addwishlist/<int:pk>', views.addWishlist, name='addwishlist'),
    path('deletewishlist/<int:pk>', views.removeWishlist, name='deletewishlist'),

    path('cart/', views.getCart, name='getcart'),
    path('addcart/<int:pk>', views.addCart, name='addcart'),
    path('deletecart/<int:pk>', views.removeCart, name='deletecart'),
    path('increaseQuantity/<int:pk>', views.increaseQuantity, name='increaseQuantity'),
    path('decreaseQuantity/<int:pk>', views.decreaseQuantity, name='decreaseQuantity'),

    path('placeOrder/', views.place_order, name='placeorder'),
    path('MyOrders/', views.getMyOrders, name='myorder'),
    path('create_order/', views.create_order, name='createorder'),
    
]

if settings.DEBUG:
     urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)