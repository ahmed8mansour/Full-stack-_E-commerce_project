from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response


from rest_framework import mixins, permissions , generics
from rest_framework.views import APIView

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication


from .serializers import MyTokenObtainPairSerializer


from rest_framework import status

from .models import CustomUser
from .serializers import CustomUserRegisterSerializer , CustomUserUpdateProfileSerializer, CustomUserProfileSerializer
# Create your views here.


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response({"error": "Refresh token not provided"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'detail': 'You have logged out successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class UserRegisterView(APIView):
    def post(self, request):
        serializer = CustomUserRegisterSerializer(data=request.data ,context={'role':request.data['role']})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status=status.HTTP_201_CREATED)
        else:
            error = serializer.errors # {'':'' , json}
            error.update({"detail" : 'this error from view because the serializer is not valid'})
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(generics.UpdateAPIView ,generics.RetrieveAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CustomUserProfileSerializer
    queryset = CustomUser.objects.all()

    def get_object(self):
        print(self.request.user)
        return self.request.user

class UserUpdateProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        user = request.user
        new_data = CustomUserUpdateProfileSerializer(user, data=request.data, partial=True)
        if new_data.is_valid():
            new_data.save()
            return Response(new_data.data)
        return Response(new_data.errors, status=status.HTTP_400_BAD_REQUEST)
