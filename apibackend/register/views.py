from django.shortcuts import render, redirect
from rest_framework import generics, permissions

from .forms import RegisterForm
from .models import User
from .serializers import (
    RegistrationReviewSerializer,
    RegistrationSerializer,
    UserProfileSerializer,
)


def landing_page(request):
    return render(request, 'landing.html')


def register_view(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = RegisterForm()
    return render(request, 'register.html', {'form': form})


class RegistrationCreateAPIView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = (permissions.AllowAny,)


class RegistrationListAPIView(generics.ListAPIView):
    serializer_class = RegistrationReviewSerializer
    permission_classes = (permissions.IsAdminUser,)
    queryset = User.objects.filter(is_staff=False).order_by('-created_at')


class RegistrationDetailAPIView(generics.UpdateAPIView):
    serializer_class = RegistrationReviewSerializer
    permission_classes = (permissions.IsAdminUser,)
    queryset = User.objects.filter(is_staff=False)


class UserProfileAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user
