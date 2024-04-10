import datetime

from django.db import models


# Create your models here.

class User(models.Model):
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=200)

    def __str__(self):
        return self.email


class Vote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vote_ciphertext = models.BinaryField()

    def __str__(self):
        return f"{self.user} = {self.vote_ciphertext}"
