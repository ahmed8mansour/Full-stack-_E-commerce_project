from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from rest_framework import serializers


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
                raise serializers.ValidationError("Invalid email or password")
            if request_path == '/auth/user/login/':
                if user.role == 'user':
                    data = super().validate(attrs)
                    return data
                else:
                    raise serializers.ValidationError("only the users can signing here")
            elif request_path == '/auth/admin/login/':
                if user.role == 'admin':
                    data = super().validate(attrs)
                    return data
                else:
                    raise serializers.ValidationError("only the admins can signing here")
            else:
                raise serializers.ValidationError("Invalid request path")
        else:
            raise serializers.ValidationError("Email and password must be provided")
    