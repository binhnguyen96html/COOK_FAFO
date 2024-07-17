from django.urls import path
from .views import MenusCreate, MenusRetrieveUpdatedDelete

urlpatterns = [
     path('menus', MenusCreate.as_view(), name='Create-Menus-List'),
     path('menus/<int:pk>/', MenusRetrieveUpdatedDelete.as_view(), name='Menus-Retrieve-Update-Delete')
]
