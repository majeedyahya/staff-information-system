from rest_framework import serializers

from .models import User


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'full_name', 'gender', 'phone_number', 'email', 'password', 'confirm_password')

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({'confirm_password': 'Passwords do not match.'})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        return User.objects.create_user(
            **validated_data,
            password=password,
            status=User.Status.PENDING,
            is_active=False,
        )


class RegistrationReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'full_name', 'gender', 'phone_number', 'email', 'status', 'created_at')
        read_only_fields = ('id', 'username', 'full_name', 'gender', 'phone_number', 'email', 'created_at')

    def update(self, instance, validated_data):
        status = validated_data.get('status', instance.status)
        instance.status = status
        instance.is_active = status == User.Status.ACCEPTED
        instance.save(update_fields=('status', 'is_active'))
        return instance


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'full_name', 'gender', 'phone_number', 'email', 'status')
        read_only_fields = ('id', 'username', 'status')
