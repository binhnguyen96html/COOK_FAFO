from django.urls import path
from .views import ProductsCreate, ProductRetrieveUpdatedDelete


urlpatterns = [
  path('products', ProductsCreate.as_view(), name='Create-Products-List'),
  path('products/<int:pk>', ProductRetrieveUpdatedDelete.as_view(), name='Products-Retrieve-Update-Delete')
]