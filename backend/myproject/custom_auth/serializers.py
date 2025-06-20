from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import CustomUser
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(email=email, password=password)
            request_path = self.context.get("request").path
            print(user)
            # print(user.role)
            # print(request_path)
            if user is None:
                raise serializers.ValidationError({"error_message":"invalid username or password"})
            if request_path == '/auth/user/login/':
                if user.role == 'user':
                    data = super().validate(attrs)
                    return data
                else:
                    raise serializers.ValidationError({"error_message":"only the users can signing here"})
            elif request_path == '/auth/admin/login/':
                if user.role == 'admin':
                    data = super().validate(attrs)
                    return data
                else:
                    raise serializers.ValidationError({"error_message":"only the admins can signing here"})
            else:
                raise serializers.ValidationError({"error_message":"invalid request path"})
        else:
            raise serializers.ValidationError({"error_message" : "Email and password must be provided"})
    
class CustomUserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ['groups', 'user_permissions']

    def create(self, validated_data):
        role = self.context['role']
        
        if role == 'user':
            user = CustomUser.objects.create_user(**validated_data)
        elif role == 'admin':
            user = CustomUser.objects.create_superuser(**validated_data)
        else:
            raise serializers.ValidationError({'error_message': 'role not provided'})
        refresh = RefreshToken.for_user(user)
        self.context['refresh'] = refresh
        return user

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data.pop('password', None)
        data.pop('is_staff', None)
        data.pop('is_superuser', None)

        refresh = self.context['refresh']
        print(self.context)

        response_data = {
            'message' : 'تم التسجيل بنجاح',
            'user_data':data , 
            'tokens':{
                'refresh':str(refresh),
                'access':str(refresh.access_token),
            }
        }
        
        return response_data

class CustomUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ['groups', 'user_permissions', 'password', 'is_staff', 'is_superuser']

    
class CustomUserUpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ['groups','username' ,'user_permissions', 'password', 'is_staff', 'is_superuser']