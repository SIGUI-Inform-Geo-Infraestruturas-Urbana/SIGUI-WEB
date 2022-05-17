from django.db import models
from uuid import uuid4

# Create your models here.

class Layers(models.Model):
    id_layer = models.UUIDField(primary_key=True,default=uuid4,editable=False)
    name = models.CharField(max_length=80)
    location = models.CharField(max_length=80)

class Equipament(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid4,editable=False)
    value = models.CharField(max_length=80)
    viewValue = models.CharField(max_length=80)

    # def __str__(self):
    #     return self.value
    
