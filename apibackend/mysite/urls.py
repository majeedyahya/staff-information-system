from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from register.views import landing_page

schema_view = get_schema_view(
    openapi.Info(
        title='Staff Information System API',
        default_version='v1',
        description='API documentation for Staff Information System',
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('', landing_page, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('register.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='redoc-ui'),
]

if settings.DEBUG:
    urlpatterns += static('/staff_images/', document_root=settings.BASE_DIR / 'staff_images')
    if hasattr(settings, 'STATICFILES_DIRS') and settings.STATICFILES_DIRS:
        urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
