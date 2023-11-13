@api_view(['GET']) 
def details(request):
    if request.method=="GET":
        result =seller.objects.all()  
        serializers = SellerSerializer(result, many=True)  
        return Response({'status': 'success', "students":serializers.data}, status=200)
    
@api_view(['POST'])
def createk(request):
    serializer = SellerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_201_CREATED)
    return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])   
def edit(request,id):
    try:
        sellers=seller.objects.get(id=id) 
    except seller.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND) 
    if request.method=="PUT":
        serializer = SellerSerializer(instance=sellers,data=request.data)  
        if serializer.is_valid():  
            serializer.save()  
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)  
        else:  
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])   
def delete(request,id):
    try:
        sellers=seller.objects.get(id=id) 
    except seller.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND) 
    if request.method=="DELETE":
        sellers.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        



'''# Create your views here.
def home(request):
    return render(request,"index.html")

def register(request):
    if request.method=="POST":
      name=request.POST["name"]
      email=request.POST["email"]
      password=request.POST["password"]
      pincode=request.POST["pincode"]
      if User.objects.filter(username=email).exists():
         messages.info(request,"user already exist")
         return render(request,"register.html") 
      else:
         user=User.objects.create_user(first_name=name,username=email,email=email,password=password)
         
         user.save()
         s=seller.objects.create(user=user,pincode=pincode)
         
         return render(request,"index.html")
    else:
       return render(request,"register.html") 

def loginuser(request):
    if request.method=="POST":
      email=request.POST["email"]
      password=request.POST["password"]
      try:
            user = User.objects.get(username=email)
            print(user.name,user.email,user.password)
      except:
            messages.error(request,'User does not exist')
      user=authenticate(username=email,password=password)
      if user is not None:
         login(request,user)
         s=seller.objects.get(user=user)
         print(s.pincode)
         return render(request,"profile.html")
      else:
         messages.info(request,"invalid details")
         return render(request,"login.html")
    else:
       return render(request,"login.html")

def logoutuser(request):
    logout(request)
    return redirect("/")
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)'''

