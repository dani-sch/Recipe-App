# Import necessary modules for URL configuration
from django.urls import path  
from .views import RegisterUser, LoginUser

urlpatterns = [
    # Route for user registration
    path('register/', RegisterUser.as_view(), name = 'register'),

    # Route for user login
    path('login/', LoginUser.as_view(), name = 'login')

]