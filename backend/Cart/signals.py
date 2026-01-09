from django.db.models.signals import post_save, post_delete 
from django.dispatch import receiver
from .models import CartItem, Cart

@receiver([post_save, post_delete], sender=CartItem)
def update_cart_totals(sender, instance, **kwargs):
    cart = instance.cart
    items = cart.items.all()

    subtotal = sum([item.total_price for item in items])
    discount = cart.available_discount or 0
    delivery = getattr(cart, 'delivery_fee', 0)
    total = subtotal - (discount * subtotal) + delivery

    Cart.objects.filter(pk=cart.pk).update(Subtotal=subtotal, Total=total)


@receiver(post_save, sender=Cart)
def update_cart_total_on_cart_change(sender, instance, **kwargs):
    items = instance.items.all()

    subtotal = sum([item.total_price for item in items])
    discount = instance.available_discount or 0
    delivery = getattr(instance, 'delivery_fee', 0)
    total = subtotal - (discount * subtotal) + delivery

    Cart.objects.filter(pk=instance.pk).update(Subtotal=subtotal, Total=total)

