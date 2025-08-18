"""
Portfolio app configuration.
"""

from django.apps import AppConfig

class PortfolioConfig(AppConfig):
    """Configuration for the portfolio app."""
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'portfolio'
