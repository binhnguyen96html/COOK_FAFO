from rest_framework.views import APIView
from rest_framework.response import Response
from . serializer import *
from rest_framework import status

# Create your views here.
class ReactView(APIView):

  serializer_class = ReactSerializer

  def get(self, request):
    output = [{'name': output.name, 
               'image': output.image,
                'category': output.category, 
                'description': output.description,
                'recipes': output.recipes, 
                'rating': output.rating, 
                'numReviews': output.numReviews, 
                'cookList': output.cookList
                }
                for output in React.objects.all()]
    return Response(output)
  
  def post(self, request):
    serializer = ReactSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
      serializer.save()
      return Response(serializer.data)
    
  def delete(self, request, pk=None):
      if pk is None:
        return Response({"error": "No ID provided"}, status=status.HTTP_400_BAD_REQUEST)
        
      try:
        react_instance = React.objects.get(pk=pk)
        react_instance.delete()
        return Response({'message':"Item deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
      except React.DoesNotExist:            
        return Response({'message': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)