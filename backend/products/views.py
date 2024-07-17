from rest_framework import generics
from .models import Products
from .serializer import ProductsSerializer

# Create your views here.

# create a product and to display 
class ProductsCreate(generics.ListCreateAPIView):
  queryset = Products.objects.all()
  serializer_class = ProductsSerializer


# to retrieve, update or delete a product by id
class ProductRetrieveUpdatedDelete(generics.RetrieveUpdateDestroyAPIView):
  queryset = Products.objects.all()
  serializer_class = ProductsSerializer