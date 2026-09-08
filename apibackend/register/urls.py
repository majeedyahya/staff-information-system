from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

from .views import (
    RegistrationCreateAPIView,
    RegistrationDetailAPIView,
    RegistrationListAPIView,
    UserProfileAPIView,
    api_root,
    landing_page,
)


urlpatterns = [
    path('', api_root, name='api-root'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('register/', RegistrationCreateAPIView.as_view(), name='register-api'),
    path('registrations/', RegistrationListAPIView.as_view(), name='registration-list'),
    path('registrations/<int:pk>/', RegistrationDetailAPIView.as_view(), name='registration-detail'),
    path('profile/', UserProfileAPIView.as_view(), name='user-profile'),
    path('landing/', landing_page, name='landing_page'),
]
