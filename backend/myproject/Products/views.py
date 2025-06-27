from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response

from rest_framework import mixins, permissions , generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication


from .serializers import ProductSerializer , ProductFAQsSerializer , ProductReviewSerializer
from .models import Product , ProductFAQs , ProductReview

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework.pagination import LimitOffsetPagination

# Create your views here.


@method_decorator(csrf_exempt, name='dispatch')
class ProductCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        serializer = ProductSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors , status= status.HTTP_400_BAD_REQUEST)

class ProductHomepageReviewsView(APIView):
    def get(self, request):
        home_reviews = ProductReview.objects.all().order_by("-rating")[:6]
        home_reviews_serizlizer = ProductReviewSerializer(home_reviews ,many = True)
        if home_reviews_serizlizer.data:
            return Response(home_reviews_serizlizer.data , status=status.HTTP_200_OK)
        else:
            return Response({"error_message": "there is no reviews"} , status=status.HTTP_404_NOT_FOUND)

class ProductHomePageNewArrivalsView(APIView):
    def get(self, request , limit):
        newest_paginator = LimitOffsetPagination()
        newest_paginator.default_limit = limit


        # new arrivals
        newest_qs = Product.objects.all().order_by('-adding_date')
        newest_paginated = newest_paginator.paginate_queryset(newest_qs , request)
        newest_serializer = ProductSerializer(newest_paginated , many=True)

        repsonse= {
                'count':newest_qs.count(),
                'next':newest_paginator.get_next_link(),
                'previous':newest_paginator.get_previous_link(),
                'results':newest_serializer.data,
        }

        return Response(repsonse , status= status.HTTP_200_OK)


class ProductHomepageTopRatedView(APIView):

    def get(self, request , limit):


        top_rated_paginator = LimitOffsetPagination()
        top_rated_paginator.default_limit = limit

        # -addin_date >> تنازلي  ||| adding_date >> تصاعدي

        # top rated
        top_rated_qs = Product.objects.all().order_by('-rate')
        top_rated_paginated  = top_rated_paginator.paginate_queryset(top_rated_qs , request)
        top_rated_serializer = ProductSerializer(top_rated_paginated , many=True)

        repsonse= {
                'count':top_rated_qs.count(),
                'next':top_rated_paginator.get_next_link(),
                'previous':top_rated_paginator.get_previous_link(),
                'results':top_rated_serializer.data,
        }
        return Response(repsonse)


# expired
class ProductMixinsAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # lookup_field = 'pk'

    def get_queryset(self):
        style = self.kwargs['style']
        qs =super().get_queryset().filter(style=style)
        return qs
        




class ProductDefaultStyleView(APIView):

    def get(self , request , style , limit):
        selected_products_paginator = LimitOffsetPagination()
        selected_products_paginator.default_limit = limit

        selected_products = Product.objects.filter(style=style)
        selected_products_paginated = selected_products_paginator.paginate_queryset(selected_products , request)
        
        if selected_products.exists():
            serializer = ProductSerializer(selected_products_paginated , many=True)
            return Response({
                'count':selected_products.count(),
                'next':selected_products_paginator.get_next_link(),
                'previous':selected_products_paginator.get_previous_link(),
                'results':serializer.data
            })
        else:
            return Response({'detati' : "لا يوجد منتجات بهذا الستايل"} , status= status.HTTP_404_NOT_FOUND)

    

class ProductFilteringView(APIView):

    def post(self , request , style , limit):
        filter_paginator = LimitOffsetPagination()
        filter_paginator.default_limit = limit


        Selected_style_products = Product.objects.filter(style=style)
        if Selected_style_products.exists():
            category = request.data["category"]
            SelectedColor = request.data["SelectedColor"]
            SelectedSize = request.data["SelectedSize"]
            priceRange = request.data["priceRange"].split('-')
            first_price_range = priceRange[0]
            last_price_range = priceRange[1]            

            filtered_products = Selected_style_products.filter(
                category__name=category,
                price_after__range=(first_price_range, last_price_range)
            )
            final_products = [p for p in filtered_products if SelectedColor in p.available_colors and SelectedSize in p.available_sizes]
            final_products_paginated = filter_paginator.paginate_queryset(final_products,request)
            serializer = ProductSerializer(final_products_paginated , many=True)

            if serializer.data:
                return Response({
                    'count':len(final_products),
                    'next':filter_paginator.get_next_link(),
                    'previous':filter_paginator.get_previous_link(),
                    'results':serializer.data
                } , status=status.HTTP_200_OK)
            else:
                return Response({'detail': "لا يوجد منتجات مطابقة للفلترة"} , status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'detail' : "لا يوجد منتجات بهذا الستايل"} , status= status.HTTP_404_NOT_FOUND)

# PostMan تاكد انها شغالة في 
class ProductSpecificView(APIView):
    def get(self, request ,style ,  product_id):
        reviews_paginator = LimitOffsetPagination()
        reviews_paginator.default_limit = 2

        specific_product = Product.objects.filter(id = product_id , style = style)
        specific_product_faqs = ProductFAQs.objects.filter(product = product_id)
        specific_product_reviews = ProductReview.objects.filter(product = product_id)

        reviews_paginated = reviews_paginator.paginate_queryset(specific_product_reviews , request)

        if specific_product.exists():

            serializer= ProductSerializer(specific_product , many=True)
            faqsSerilizer = ProductFAQsSerializer(specific_product_faqs , many=True)
            reviewSerilizer = ProductReviewSerializer(reviews_paginated , many=True )

            product_style = serializer.data[0]["style"]
            product_category = serializer.data[0]["category"]
            also_like_product = Product.objects.filter(style = product_style , category = product_category).exclude(id = product_id)

            also_like_product_serilizar = ProductSerializer(also_like_product , many = True)

            if serializer.data:
                all_data_product = {
                    'product_data' : serializer.data[0],
                    'FAQs' : faqsSerilizer.data,
                    'Reviews' : {
                        'count': specific_product_reviews.count(),
                        'next': reviews_paginator.get_next_link(),
                        'previous': reviews_paginator.get_previous_link(),
                        'results': reviewSerilizer.data
                        
                    },
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
        #     "product":"2",
        #     "rating":"4",
        #     "comment":"3333333333"

        # }
        data = request.data
        data.update({"user": request.user.id })
        print(data)
        serilaizr = ProductReviewSerializer(data = data)
        if serilaizr.is_valid():
            print("serializer is valid")
            serilaizr.save()
            print(serilaizr.data)
            return Response(serilaizr.data , status=status.HTTP_200_OK)
        else:
            return Response(serilaizr.errors , status= status.HTTP_404_NOT_FOUND)
