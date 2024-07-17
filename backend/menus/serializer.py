from rest_framework import serializers
from .models import *

class MenusSerializer(serializers.ModelSerializer):
  class Meta:
    model = Menus
    # fields = ['id', 'name', 'image', 'category', 'description' ,'recipes', 'rating', 'numReviews', 'cookList']
    fields = '__all__'