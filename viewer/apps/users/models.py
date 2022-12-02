from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Annotation(models.Model):
    id = models.AutoField(primary_key=True)
    timestamp = models.CharField(max_length=20)
    contents = models.CharField(max_length=1000)

    def __str__(self):
            return f"{self.timestamp}"

class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    timestamp = models.CharField(max_length=20)
    contents = models.CharField(max_length=1000)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
            return f"{self.timestamp} @ {self.author}"