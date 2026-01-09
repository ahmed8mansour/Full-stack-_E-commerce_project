from django.urls import path
from .views import CustomTokenObtainPairView ,UserUpdateProfileView , LogoutView , UserRegisterView , UserProfileView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('user/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('admin/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair2'),

    path('user/logout/' , LogoutView.as_view() , name="user_logout"),
    path('admin/logout/' , LogoutView.as_view() , name="admin_logout"),

    path('user/register/' , UserRegisterView.as_view() , name="user_register"),
    path('admin/register/' , UserRegisterView.as_view() , name="admin_register"),

    path('user/profile/' , UserProfileView.as_view() , name="user_profile"),
    path('admin/profile/' , UserProfileView.as_view() , name="admin_profile"),

    path('user/update/' , UserUpdateProfileView.as_view() , name="user_update_profile"),
    path('admin/update/' , UserUpdateProfileView.as_view() , name="admin_update_profile"),

    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
