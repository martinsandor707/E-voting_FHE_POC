from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("users/", views.user_list, name="user_list"),
    path("users/<str:id>", views.user_detail),
    path("login", views.user_login, name="user_login")
]