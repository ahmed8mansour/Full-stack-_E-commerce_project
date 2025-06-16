from django.urls import path
from .views import  ProductCreateView , ProductMixinsAPIView, ProductHomepageCardsView,ProductReviewRegisterView, ProductSpecificView,  ProductFilteringView , ProductDefaultStyleView

urlpatterns = [
    path('create/', ProductCreateView.as_view(), name='product_create'),
    path('homepageCards/', ProductHomepageCardsView.as_view(), name='product_create'),
    path('DefaultStylePage/<str:style>/', ProductMixinsAPIView.as_view(), name='DefalutStylePage'),
    path('DefaultStylePage/<str:style>/filter/', ProductFilteringView.as_view(), name='DefalutStylePage'),
    path('<int:product_id>/', ProductSpecificView.as_view(), name='DefalutStylePage'),
    path('review/register/', ProductReviewRegisterView.as_view(), name='DefalutStylePage'),
]
