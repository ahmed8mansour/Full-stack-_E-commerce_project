from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response

from rest_framework import mixins, permissions , generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication


from .serializers import ProductCreateSerializer , ProductFAQsSerializer , ProductReviewSerializer , ProductSpecificSerializer , ProductFilteringSerilizer ,ProductDefaultStyleSerializer , ProductHomepageCardsSerializer
from .models import Product , ProductFAQs , ProductReview

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


@method_decorator(csrf_exempt, name='dispatch')
class ProductCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        serializer = ProductCreateSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors , status= status.HTTP_400_BAD_REQUEST)

class ProductHomepageCardsView(APIView):

    def get(self, request):
        # -addin_date >> تنازلي  ||| adding_date >> تصاعدي

        # new arrivals
        newest_products = Product.objects.all().order_by('-adding_date')[:4]
        serializer1 = ProductHomepageCardsSerializer(newest_products , many=True)
        # top rated
        top_rated_products = Product.objects.all().order_by('-rate')[:4]
        serializer2 = ProductHomepageCardsSerializer(top_rated_products , many=True)

        repsonse= {
            'newArrivals': serializer1.data,
            'topRated': serializer2.data,
            # reviews
        }
        return Response(repsonse)


class ProductMixinsAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDefaultStyleSerializer
    # lookup_field = 'pk'

    def get_queryset(self):
        style = self.kwargs['style']
        qs =super().get_queryset().filter(style=style)
        return qs
        




# not used yet
class ProductDefaultStyleView(APIView):

    def get(self , request , style):
        selected_products = Product.objects.filter(style=style)
        if selected_products.exists():
            serializer = ProductDefaultStyleSerializer(selected_products , many=True)
            print(serializer.data)
            return Response(serializer.data)
        else:
            return Response({'detati' : "لا يوجد منتجات بهذا الستايل"} , status= status.HTTP_404_NOT_FOUND)

    

class ProductFilteringView(APIView):

    def get(self , request , style):
        Selected_style_products = Product.objects.filter(style=style)
        if Selected_style_products.exists():
            category = request.data.dict()["category"]
            SelectedColor = request.data.dict()["SelectedColor"]
            SelectedSize = request.data.dict()["SelectedSize"]
            priceRange = request.data.dict()["priceRange"].split('-')
            first_price_range = priceRange[0]
            last_price_range = priceRange[1]            

            filtered_products = Selected_style_products.filter(
                category__name=category,
                price__range=(first_price_range, last_price_range)
            )
            final_products = [p for p in filtered_products if SelectedColor in p.available_colors and SelectedSize in p.available_sizes]

            serializer = ProductFilteringSerilizer(final_products , many=True)
            if serializer.data:
                return Response(serializer.data , status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors , status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'detail' : "لا يوجد منتجات بهذا الستايل"} , status= status.HTTP_404_NOT_FOUND)

# PostMan تاكد انها شغالة في 
class ProductSpecificView(APIView):
    def get(self, request , product_id):
        specific_product = Product.objects.filter(id = product_id)
        specific_product_faqs = ProductFAQs.objects.filter(product = product_id)
        specific_product_reviews = ProductReview.objects.filter(product = product_id)
        if specific_product.exists():

            serializer= ProductSpecificSerializer(specific_product , many=True)
            faqsSerilizer = ProductFAQsSerializer(specific_product_faqs , many=True)
            reviewSerilizer = ProductReviewSerializer(specific_product_reviews , many=True )

            product_style = serializer.data[0]["style"]
            product_category = serializer.data[0]["category"]
            also_like_product = Product.objects.filter(style = product_style , category = product_category).exclude(id = product_id)

            also_like_product_serilizar = ProductSpecificSerializer(also_like_product , many = True)

            if serializer.data:
                all_data_product = {
                    'product_data' : serializer.data[0],
                    'FAQs' : faqsSerilizer.data,
                    'Reviews' : reviewSerilizer.data,
                    'AlsoLikeProduct' : also_like_product_serilizar.data
                }

                return Response(all_data_product , status= status.HTTP_200_OK)
            else:
                Response(serializer.errors, status= status.HTTP_404_NOT_FOUND)
        else:
            return Response({'detail':"there is no product with this id"}, status= status.HTTP_404_NOT_FOUND)

# PostMan تاكد انها شغالة في 

class ProductReviewRegisterView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self , request):
        # {
        #     "user":"1",
        #     "product":"2",
        #     "rating":"4",
        #     "comment":"3333333333"

        # }
        serilaizr = ProductReviewSerializer(data = request.data)
        if serilaizr.is_valid():
            serilaizr.save()
            return Response(serilaizr.data , status=status.HTTP_200_OK)
        else:
            return Response(serilaizr.errors , status= status.HTTP_404_NOT_FOUND)
