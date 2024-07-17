from rest_framework.response import Response
from . serializer import *
from rest_framework import generics
from .models import Menus
from .serializer import MenusSerializer

# Create your views here.

# create a menu and to display 
class MenusCreate(generics.ListCreateAPIView):
  queryset = Menus.objects.all()
  serializer_class = MenusSerializer


class MenusRetrieveUpdatedDelete(generics.RetrieveUpdateDestroyAPIView):
  queryset = Menus.objects.all()
  serializer_class = MenusSerializer











# -------------------------------------------------------
# class MenusView(APIView):

#   serializer_class = MenusSerializer

#   def get(self, request):
#     output = [{'name': output.name, 
#                'image': output.image,
#                 'category': output.category, 
#                 'description': output.description,
#                 'recipes': output.recipes, 
#                 'rating': output.rating, 
#                 'numReviews': output.numReviews, 
#                 'cookList': output.cookList
#                 }
#                 for output in Menus.objects.all()]
#     return Response(output)
  
#   def post(self, request):
#     serializer = MenusSerializer(data=request.data)
#     if serializer.is_valid(raise_exception=True):
#       serializer.save()
#       return Response(serializer.data)
    
#   def delete(self, request, pk=None):
      # if pk is None:
      #   return Response({"error": "No ID provided"}, status=status.HTTP_400_BAD_REQUEST)
        
      # try:
      #   Menus_instance = Menus.objects.get(pk=pk)
      #   Menus_instance.delete()
      #   return Response({'message':"Item deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
      # except Menus.DoesNotExist:            
      #   return Response({'message': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)