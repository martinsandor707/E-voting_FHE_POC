from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("users/", views.user_list, name="user_list"),
    path("users/<str:id>", views.user_detail),
    path("login/", views.user_login, name="user_login"),
    path("token_test/", views.token_test, name="token_test"),
    path("votes/", views.vote_list, name="vote_list"),
    path("votes/<str:id>", views.vote_detail, name="vote_detail")
]