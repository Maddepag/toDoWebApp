from rest_framework import serializers
from .models import sharedList

class sharedListSerializer(serializers.ModelSerializer):
    class Meta:
        model = sharedList
        fields = ('id', 'code', 'creator','guest_edit_list', 'created_at')

class createListSerializer(serializers.ModelSerializer):
    class Meta:
        model = sharedList
        fields = ('guest_edit_list',)