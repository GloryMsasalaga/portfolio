"""
Views for the portfolio app.
"""

from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
from .models import Project, Contact, Service, ServiceOrder, Skill, Education, Experience

def home(request):
    """View for home page."""
    projects = Project.objects.all()[:3]  # Get only 3 most recent projects
    skills = Skill.objects.all()
    services = Service.objects.all()
    
    context = {
        'projects': projects,
        'skills': skills,
        'services': services,
    }
    return render(request, 'index.html', context)

def about(request):
    """View for about page."""
    skills = Skill.objects.all()
    education = Education.objects.all()
    experience = Experience.objects.all()
    
    context = {
        'skills': skills,
        'education': education,
        'experience': experience,
    }
    return render(request, 'about.html', context)

def projects(request):
    """View for projects page."""
    projects = Project.objects.all()
    return render(request, 'projects.html', {'projects': projects})

def services(request):
    """View for services page."""
    services = Service.objects.all()
    return render(request, 'services.html', {'services': services})

def contact(request):
    """View for contact page."""
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        contact_obj = Contact.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message
        )
        
        messages.success(request, 'Your message has been sent successfully!')
        return redirect('contact')
    
    return render(request, 'contact.html')

def service_order(request, service_id):
    """View for service order page."""
    service = get_object_or_404(Service, id=service_id)
    
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        requirements = request.POST.get('requirements')
        
        order = ServiceOrder.objects.create(
            service=service,
            name=name,
            email=email,
            requirements=requirements
        )
        
        messages.success(request, 'Your service order has been submitted successfully!')
        return redirect('services')
    
    return render(request, 'service_order.html', {'service': service})

# Simple API Views for AJAX requests
@csrf_exempt
def contact_api(request):
    """API view for contact form."""
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        if name and email and subject and message:
            Contact.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message
            )
            return JsonResponse({'status': 'success', 'message': 'Your message has been sent successfully!'})
        else:
            return JsonResponse({'status': 'error', 'message': 'All fields are required.'})
    
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})

@csrf_exempt
def service_order_api(request):
    """API view for service order."""
    if request.method == 'POST':
        service_id = request.POST.get('service')
        name = request.POST.get('name')
        email = request.POST.get('email')
        requirements = request.POST.get('requirements')
        
        if service_id and name and email and requirements:
            try:
                service = Service.objects.get(id=service_id)
                ServiceOrder.objects.create(
                    service=service,
                    name=name,
                    email=email,
                    requirements=requirements
                )
                return JsonResponse({'status': 'success', 'message': 'Your service order has been submitted successfully!'})
            except Service.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'Service not found.'})
        else:
            return JsonResponse({'status': 'error', 'message': 'All fields are required.'})
    
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})

def projects_api(request):
    """API view for projects."""
    projects = Project.objects.all()
    data = []
    for project in projects:
        data.append({
            'id': project.id,
            'title': project.title,
            'description': project.description,
            'technologies': project.technologies,
            'github_link': project.github_link,
            'live_link': project.live_link,
            'created_at': project.created_at.isoformat()
        })
    return JsonResponse(data, safe=False)

def skills_api(request):
    """API view for skills."""
    skills = Skill.objects.all()
    data = []
    for skill in skills:
        data.append({
            'id': skill.id,
            'name': skill.name,
            'proficiency': skill.proficiency,
            'category': skill.category
        })
    return JsonResponse(data, safe=False)

def services_api(request):
    """API view for services."""
    services = Service.objects.all()
    data = []
    for service in services:
        data.append({
            'id': service.id,
            'title': service.title,
            'description': service.description,
            'price': float(service.price) if service.price else None,
            'icon': service.icon
        })
    return JsonResponse(data, safe=False)
