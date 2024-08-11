from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Room
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from .serializers import LoginSerializer, SignupSerializer, RoomSerializer
# Create your views here.

User = get_user_model()


class signup(APIView):

    permission_classes = [AllowAny]

    def get(self, request):
        data = User.objects.all()
        serializer = SignupSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                user = User.objects.get(email=serializer.validated_data['email'])
                token = Token.objects.create(user=user)
                print(token)
                return Response({'token': token.key}, status=status.HTTP_200_OK)
            except Exception as e:
                print(e)
                return Response({'error': 'An error occured during signup'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            errors = serializer.errors
            if 'email' in errors:
                return Response({'error': errors['email'][0]}, status=status.HTTP_409_CONFLICT)
            else:
                return Response(errors, status=status.HTTP_400_BAD_REQUEST)


class login(APIView):

    permission_classes = [AllowAny]
    
    def get(self, request):
        data = User.objects.all()
        serializer = LoginSerializer(data, context={'request':request}, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                email=serializer.validated_data['email'],
                password=serializer.validated_data['password']
            )
            if user is not None:
                token, created = Token.objects.get_or_create(user=user)
                print("Logged in user:", user)
                return Response({'token': token.key}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# List and Create View
class RoomListCreateView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

# Retrieve, Update, and Delete View
class RoomDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
