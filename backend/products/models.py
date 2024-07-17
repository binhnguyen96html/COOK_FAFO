from django.db import models

# Create your models here.
class Products(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=100)
  image = models.JSONField()
  description = models.TextField()
  brand = models.CharField(max_length=200)
  category = models.CharField(max_length=100)
  price = models.FloatField()
  countInStock = models.IntegerField()
  rating = models.FloatField()
  numReviews = models.IntegerField()
  cookList = models.JSONField()
