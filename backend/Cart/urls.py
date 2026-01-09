from django.urls import path
from .views import CartAddView , CartItemAddView ,CartItemOnChangeView, CartItemListView , CartItemDeleteView

urlpatterns = [
    path('add/', CartAddView.as_view(), name='add_cart'),
    path('cartItem/add/', CartItemAddView.as_view(), name='add_cart_item'),
    path('cartItem/listview/', CartItemListView.as_view(), name='list_cart_items'),
    path('cartItem/delete/<int:item_id>/', CartItemDeleteView.as_view(), name='delete_cart_item'),
    path('cartItem/update/<int:item_id>/', CartItemOnChangeView.as_view(), name='delete_cart_item'),

]