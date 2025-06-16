from django.shortcuts import render
from rest_framework.response import Response
from django.http import HttpResponse 

from rest_framework import mixins, permissions , generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializer import CartSerializer ,CartItemSerializer , CartItemUpdateSerializer

from Products.models import Product 
from Products.serializers import ProductSpecificSerializer
from .models import Cart , CartItem
# Create your views here.



class CartAddView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self , request):

        data = {
            'user':request.user.id,
        }
        serializer = CartSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status= status.HTTP_200_OK)
        else:
            return Response(serializer.errors , status= status.HTTP_400_BAD_REQUEST)

class CartItemAddView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    # body = {
    #     'product':'2',
    #     'quantity':'3',
    # }


    def post(self , request):

        data = {}
        user_id = request.user.id
        user_cart = CartSerializer(Cart.objects.get(user=user_id)).data['id']
        data.update({'cart':user_cart})
        data.update(request.data)
        print(data['product'])
        print(data)
        price = float(ProductSpecificSerializer(Product.objects.get(id = data['product'])).data['price'])
        total_price = price * int(data['quantity'])
        
        data.update({
            'price':f'{price}', 
            'total_price':f'{total_price}', 
        })



        print(data)

        serializer = CartItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status= status.HTTP_200_OK)
        else:
            return Response(serializer.errors , status= status.HTTP_400_BAD_REQUEST)



class CartItemListView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self , request):

        user = request.user
        try:
            cart = Cart.objects.get(user=user)
        except Cart.DoesNotExist:
            return Response({"detail": "Cart not found."}, status=status.HTTP_404_NOT_FOUND)

        cart_items_qs = CartItem.objects.filter(cart = cart)
        cart_items_serializer = CartItemSerializer(cart_items_qs , many = True)
        return Response(cart_items_serializer.data , status= status.HTTP_200_OK)

        # return Response({"detail":"dddddd"})

class CartItemDeleteView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, item_id):
        print(item_id)
        print(request.user)
        try:
            cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
        except CartItem.DoesNotExist:
            return Response({"detail": "Cart item not found."}, status=status.HTTP_404_NOT_FOUND)

        cart_item.delete()
        return Response({"detail": "Cart item deleted successfully."}, status=status.HTTP_204_NO_CONTENT) 

class CartItemOnChangeView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    # {
    #     "quantity":"22",
    #     "operation":"+"
    # }

    def put(self , request , item_id):
        try:
            cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)            
        except CartItem.DoesNotExist:
            return Response({"detail": "Cart item not found."}, status=status.HTTP_404_NOT_FOUND)
        
        request_data = request.data
        opertion = request_data.pop("operation")  

        serializer = CartItemUpdateSerializer(cart_item , data = request_data , context = {"operation":opertion})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status= status.HTTP_200_OK)
        else:
            return Response(serializer.errors , status= status.HTTP_404_NOT_FOUND)
            

        # return Response({"detail":"dddddd"})

