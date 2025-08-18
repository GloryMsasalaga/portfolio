"""
Serializers for the portfolio app.
"""

from rest_framework import serializers
from .models import Project, Contact, Service, ServiceOrder, Skill

class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for the Project model."""
    class Meta:
        model = Project
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    """Serializer for the Contact model."""
    class Meta:
        model = Contact
        fields = ['name', 'email', 'subject', 'message']

class ServiceSerializer(serializers.ModelSerializer):
    """Serializer for the Service model."""
    class Meta:
        model = Service
        fields = '__all__'

class ServiceOrderSerializer(serializers.ModelSerializer):
    """Serializer for the ServiceOrder model."""
    class Meta:
        model = ServiceOrder
        fields = ['service', 'name', 'email', 'requirements']

class SkillSerializer(serializers.ModelSerializer):
    """Serializer for the Skill model."""
    class Meta:
        model = Skill
        fields = '__all__'
