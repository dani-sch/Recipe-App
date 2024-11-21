from rest_framework import serializers
from django.contrib.auth.models import User
#serializer- converts complex data types into JSON format to be sent to frontend by API
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # **  hashes password
        user = User.objects.create_user(**validated_data)
        return user
