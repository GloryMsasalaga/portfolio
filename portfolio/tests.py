"""
Tests for the portfolio app.
"""

from django.test import TestCase
from django.urls import reverse
from .models import Project, Contact, Service

class ProjectModelTest(TestCase):
    """Test the Project model."""
    def setUp(self):
        Project.objects.create(
            title="Test Project",
            description="This is a test project",
            technologies="Python, Django, JavaScript"
        )

    def test_project_creation(self):
        """Test that a project can be created."""
        project = Project.objects.get(title="Test Project")
        self.assertEqual(project.description, "This is a test project")
        self.assertEqual(project.technologies, "Python, Django, JavaScript")

class ContactViewTest(TestCase):
    """Test the contact view."""
    def test_contact_form_submission(self):
        """Test that a contact form can be submitted."""
        contact_data = {
            'name': 'Test User',
            'email': 'test@example.com',
            'subject': 'Test Subject',
            'message': 'This is a test message'
        }
        response = self.client.post(reverse('contact'), contact_data)
        self.assertEqual(response.status_code, 302)  # Redirect after successful submission
        self.assertEqual(Contact.objects.count(), 1)
        contact = Contact.objects.first()
        self.assertEqual(contact.name, 'Test User')
        self.assertEqual(contact.email, 'test@example.com')

class ServiceModelTest(TestCase):
    """Test the Service model."""
    def setUp(self):
        Service.objects.create(
            title="Test Service",
            description="This is a test service",
            price=100.00,
            icon="fa-code"
        )

    def test_service_creation(self):
        """Test that a service can be created."""
        service = Service.objects.get(title="Test Service")
        self.assertEqual(service.description, "This is a test service")
        self.assertEqual(service.price, 100.00)
        self.assertEqual(service.icon, "fa-code")
