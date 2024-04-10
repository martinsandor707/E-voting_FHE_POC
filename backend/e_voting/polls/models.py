import datetime

from django.db import models


# Create your models here.

class User(models.Model):
    email = models.CharField(max_length=50, primary_key=True)
    password = models.CharField(max_length=200)

    def __str__(self):
        return self.email


class Vote(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    vote_ciphertext = models.BinaryField(max_length=4096)

    def __str__(self):
        return f"{self.user} = {self.vote_ciphertext}"
