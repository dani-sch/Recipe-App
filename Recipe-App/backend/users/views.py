from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import UserSerializer


# Create your views here.
# View for user registration
class RegisterUser(APIView): 
    """
    Handles user registration:
        - Validates incoming data using UserSerializer().
        - Creates new user and generates token
        - Returns the token in Response()
    """
    def post(self, request): 
        #deserialize JSON data
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid(): #checking if incoming JSON data is valid
            user = serializer.save() #save user to database
            token = Token.objects.create(user = user)
            return Response({'token': token.key}, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginUser(APIView): #Verifies credentials returning token if authentication is successful
    """
    Handles user login:
    - Authenticates credentions using built in function
    - Retrieves or creates a token for the user
    - Returns the token in the response if sucessful
    """
    def post(self, request):
        print("POST request received at /api/users/login/")  # Debug log
        print("Received request data:", request.data)  # Debug log
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        # authenticate the user
        user = authenticate(username = username, password = password)
        if user is None:
            print("Authentication failed")  # Debug log
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
    
        try: 
            #retrieving or creating user's authentication token
            token, _ = Token.objects.get_or_create(user=user) #g_o_c = boolean indicating whether or not new token was created
            return Response({'token': token.key}, status = status.HTTP_200_OK)
        except Exception as e:
            print(f"Token creation error: {e}")
            return Response({'error': 'Invalid Credentials'}, status = status.HTTP_401_UNAUTHORIZED)


