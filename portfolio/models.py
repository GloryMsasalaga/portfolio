"""
Models for the portfolio app.
"""

from django.db import models

class Project(models.Model):
    """Model representing a portfolio project."""
    title = models.CharField(max_length=200)
    description = models.TextField()
    technologies = models.CharField(max_length=500)
    github_link = models.URLField(blank=True, null=True)
    live_link = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to='project_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-created_at']

class Contact(models.Model):
    """Model for storing contact form submissions."""
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - {self.subject}"
    
    class Meta:
        ordering = ['-created_at']

class Service(models.Model):
    """Model representing services offered."""
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    icon = models.CharField(max_length=50, help_text="Font Awesome icon class")
    
    def __str__(self):
        return self.title

class ServiceOrder(models.Model):
    """Model for storing service orders."""
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='orders')
    name = models.CharField(max_length=100)
    email = models.EmailField()
    requirements = models.TextField()
    timeline = models.CharField(max_length=50, blank=True, null=True, help_text="Preferred project timeline")
    budget = models.CharField(max_length=50, blank=True, null=True, help_text="Budget range")
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('quoted', 'Quote Sent'),
        ('negotiating', 'Negotiating'),
        ('approved', 'Approved'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled')
    ], default='pending')
    
    def __str__(self):
        return f"{self.name} - {self.service.title}"
    
    class Meta:
        ordering = ['-created_at']

class Skill(models.Model):
    """Model representing skills."""
    name = models.CharField(max_length=100)
    proficiency = models.IntegerField(help_text="Proficiency level from 1-100")
    category = models.CharField(max_length=100, help_text="e.g., Programming, Machine Learning, etc.")
    
    def __str__(self):
        return self.name
        
    class Meta:
        ordering = ['category', '-proficiency']

class Education(models.Model):
    """Model representing education history."""
    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    field_of_study = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.degree} at {self.institution}"
    
    class Meta:
        ordering = ['-end_date', '-start_date']
        verbose_name_plural = "Education"

class Experience(models.Model):
    """Model representing work experience."""
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField()
    
    def __str__(self):
        return f"{self.position} at {self.company}"
    
    class Meta:
        ordering = ['-end_date', '-start_date']
