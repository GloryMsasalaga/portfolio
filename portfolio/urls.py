"""
URL patterns for the portfolio app.
"""

from django.urls import path
from . import views

urlpatterns = [
    # Frontend URLs
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('projects/', views.projects, name='projects'),
    path('services/', views.services, name='services'),
    path('contact/', views.contact, name='contact'),
    path('service-order/<int:service_id>/', views.service_order, name='service_order'),
    
    # API URLs
    path('api/projects/', views.projects_api, name='projects_api'),
    path('api/contact/', views.contact_api, name='contact_api'),
    path('api/service-order/', views.service_order_api, name='service_order_api'),
    path('api/skills/', views.skills_api, name='skills_api'),
    path('api/services/', views.services_api, name='services_api'),
]
