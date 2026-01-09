from django.urls import path
from .views import  ProductCreateView , ProductHomepageReviewsView, ProductMixinsAPIView, ProductHomePageNewArrivalsView,  ProductHomepageTopRatedView,ProductReviewRegisterView, ProductSpecificView,  ProductFilteringView , ProductDefaultStyleView

urlpatterns = [
    path('create/', ProductCreateView.as_view(), name='product_create'),
    path('homePage/ReviewsData/', ProductHomepageReviewsView.as_view(), name='product_create'),
    path('homePage/NewArrivalsData/<int:limit>/', ProductHomePageNewArrivalsView.as_view(), name='product_create'),
    path('homePage/TopRatedData/<int:limit>/', ProductHomepageTopRatedView.as_view(), name='product_create'),

    path('DefaultStylePage/<str:style>/<int:limit>/', ProductDefaultStyleView.as_view(), name='DefalutStylePage'),
    path('DefaultStylePage/<str:style>/filter/<int:limit>/', ProductFilteringView.as_view(), name='DefalutStylePage'),
    
    path('<str:style>/<int:product_id>/', ProductSpecificView.as_view(), name='DefalutStylePage'),
    path('review/register/', ProductReviewRegisterView.as_view(), name='DefalutStylePage'),
]
