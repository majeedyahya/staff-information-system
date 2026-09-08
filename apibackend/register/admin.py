from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'full_name', 'gender', 'phone_number', 'is_staff')
    list_filter = ('gender', 'is_staff', 'is_superuser', 'is_active')
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = UserAdmin.fieldsets + (
        ('Additional information', {'fields': ('full_name', 'gender', 'phone_number', 'created_at', 'updated_at')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Additional information', {'fields': ('email', 'full_name', 'gender', 'phone_number')}),
    )
