from portfolio.models import Project
from django.utils import timezone

def add_projects():
    projects_data = [
        {
            'title': 'Masada Intertrade Company',
            'description': 'A comprehensive fintech system designed for Masada Intertrade, streamlining financial operations and trade management.',
            'technologies': 'Django, React, PostgreSQL, Docker, AWS',
            'github_link': '',  # Placeholder
            'live_link': '',    # Placeholder
        },
        {
            'title': 'Astraea',
            'description': 'A professional accounting and auditing system providing robust financial tracking, reporting, and compliance tools.',
            'technologies': 'Python, Django REST Framework, Vue.js, PostgreSQL, Celery',
            'github_link': '',  # Placeholder
            'live_link': '',    # Placeholder
        }
    ]

    for data in projects_data:
        project, created = Project.objects.get_or_create(
            title=data['title'],
            defaults={
                'description': data['description'],
                'technologies': data['technologies'],
                'github_link': data['github_link'],
                'live_link': data['live_link'],
                'created_at': timezone.now()
            }
        )
        
        if created:
            print(f"Created project: {project.title}")
        else:
            print(f"Project already exists: {project.title}")
            # Optional: Update if it exists to ensure description matches
            project.description = data['description']
            project.technologies = data['technologies']
            project.save()
            print(f"Updated project: {project.title}")

if __name__ == '__main__':
    add_projects()
