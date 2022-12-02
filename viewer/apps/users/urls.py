from . import views
from django.urls import path, include

urlpatterns = [
    path("login/", views.login, name="login"),
    path("signup/", views.signup, name="signup")
]