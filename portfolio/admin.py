"""
Admin configuration for the portfolio app.
"""

from django.contrib import admin
from .models import Project, Contact, Service, ServiceOrder, Skill, Education, Experience

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """Admin configuration for the Project model."""
    list_display = ('title', 'created_at')
    search_fields = ('title', 'description', 'technologies')
    list_filter = ('created_at',)

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    """Admin configuration for the Contact model."""
    list_display = ('name', 'email', 'subject', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    list_filter = ('created_at',)
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    """Admin configuration for the Service model."""
    list_display = ('title', 'price')
    search_fields = ('title', 'description')

@admin.register(ServiceOrder)
class ServiceOrderAdmin(admin.ModelAdmin):
    """Admin configuration for the ServiceOrder model."""
    list_display = ('name', 'email', 'service', 'status', 'created_at')
    search_fields = ('name', 'email', 'requirements')
    list_filter = ('status', 'created_at', 'service')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    """Admin configuration for the Skill model."""
    list_display = ('name', 'category', 'proficiency')
    search_fields = ('name', 'category')
    list_filter = ('category',)

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    """Admin configuration for the Education model."""
    list_display = ('institution', 'degree', 'field_of_study', 'start_date', 'end_date', 'is_current')
    search_fields = ('institution', 'degree', 'field_of_study')
    list_filter = ('is_current',)

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    """Admin configuration for the Experience model."""
    list_display = ('company', 'position', 'start_date', 'end_date', 'is_current')
    search_fields = ('company', 'position', 'description')
    list_filter = ('is_current',)
