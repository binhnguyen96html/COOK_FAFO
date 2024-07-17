
from django.db import models

# Create your models here.
class React(models.Model):
  name = models.CharField(max_length=200)
  image = models.JSONField()
  category = models.CharField(max_length=100)
  description = models.TextField()
  recipes = models.JSONField()
  rating = models.FloatField()
  numReviews = models.IntegerField()
  cookList = models.JSONField()