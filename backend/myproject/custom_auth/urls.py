from django.urls import path
from .views import CustomTokenObtainPairView , test , LogoutView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', test, name='test'),
    path('user/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('admin/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair2'),
    path('user/logout/' , LogoutView.as_view() , name="user_logout"),
    path('admin/logout/' , LogoutView.as_view() , name="admin_logout")

    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
