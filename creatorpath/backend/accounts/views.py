from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer, UserSerializer

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, req):
        serializer = RegisterSerializer(data=req.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"msg": "Registered 🎉", "user": UserSerializer(user).data}, status=status.HTTP_201_CREATED)
        
        # Format errors into a single string
        error_msg = ""
        for field, errors in serializer.errors.items():
            error_msg += f"{field}: {errors[0]} "
        
        return Response({"msg": error_msg.strip()}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, req):
        username = req.data.get('email') # Original uses email as login identifier
        password = req.data.get('password')
        
        # Django's authenticate usually works with username, but we can match by email
        try:
            user_obj = User.objects.get(email=username)
            user = authenticate(username=user_obj.username, password=password)
        except User.DoesNotExist:
            user = None

        if user:
            login(req, user)
            return Response({"msg": f"Welcome back, {user.username}", "user": UserSerializer(user).data})
        return Response({"msg": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, req):
        return Response({"user": UserSerializer(req.user).data})
