from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_date
from portfolio.models import Project, Service, Skill, Education, Experience
from datetime import date

class Command(BaseCommand):
    help = 'Load initial data for Glory Lazaro portfolio'

    def handle(self, *args, **options):
        self.stdout.write('Starting to load initial data...')
        
        # Create Skills
        skills_data = [
            {'name': 'Python', 'proficiency': 95, 'category': 'Programming Languages'},
            {'name': 'JavaScript', 'proficiency': 90, 'category': 'Programming Languages'},
            {'name': 'Django', 'proficiency': 92, 'category': 'Web Frameworks'},
            {'name': 'React', 'proficiency': 88, 'category': 'Frontend Frameworks'},
            {'name': 'Machine Learning', 'proficiency': 85, 'category': 'AI/ML'},
            {'name': 'TensorFlow', 'proficiency': 80, 'category': 'AI/ML'},
            {'name': 'PostgreSQL', 'proficiency': 85, 'category': 'Databases'},
            {'name': 'Docker', 'proficiency': 82, 'category': 'DevOps'},
            {'name': 'AWS', 'proficiency': 78, 'category': 'Cloud Platforms'},
            {'name': 'Git', 'proficiency': 90, 'category': 'Tools'},
        ]

        for skill_data in skills_data:
            skill, created = Skill.objects.get_or_create(
                name=skill_data['name'],
                defaults=skill_data
            )
            if created:
                self.stdout.write(f'Created skill: {skill.name}')

        # Create Projects
        projects_data = [
            {
                'title': 'Smart Home IoT System',
                'description': 'An IoT system for smart home automation with mobile app control and machine learning for energy optimization.',
                'technologies': 'Python, Django REST Framework, React Native, Arduino, TensorFlow',
                'github_link': 'https://github.com/glorymsasalaga/smart-home-iot',
            },
            {
                'title': 'Portfolio Website',
                'description': 'This responsive portfolio website with 3D animations and modern design. Built with Django and Three.js.',
                'technologies': 'Python, Django, Three.js, Bootstrap 5, CSS3',
                'github_link': 'https://github.com/glorymsasalaga/portfolio',
                'live_link': 'https://veryniceglory.deploy.tz'
            }
        ]

        for project_data in projects_data:
            project, created = Project.objects.get_or_create(
                title=project_data['title'],
                defaults=project_data
            )
            if created:
                self.stdout.write(f'Created project: {project.title}')

        # Create Services
        services_data = [
            {
                'title': 'Web Development',
                'description': 'Full-stack web development using modern technologies like Django, React, and cloud platforms.',
                'price': 2500.00,
                'icon': 'fa-code'
            },
            {
                'title': 'AI/ML Solutions',
                'description': 'Custom machine learning models and AI solutions for your business needs.',
                'price': 3500.00,
                'icon': 'fa-brain'
            },
            {
                'title': 'API Development',
                'description': 'RESTful API development and integration services for web and mobile applications.',
                'price': 1800.00,
                'icon': 'fa-cogs'
            },
            {
                'title': 'Consulting',
                'description': 'Technical consulting and architecture planning for software projects.',
                'price': 150.00,
                'icon': 'fa-lightbulb'
            },
            {
                'title': 'Mobile App Development',
                'description': 'Cross-platform mobile app development using React Native and Flutter.',
                'price': 4000.00,
                'icon': 'fa-mobile-alt'
            },
            {
                'title': 'DevOps & Deployment',
                'description': 'CI/CD pipeline setup, cloud deployment, and infrastructure management.',
                'price': 2000.00,
                'icon': 'fa-cloud'
            }
        ]

        for service_data in services_data:
            service, created = Service.objects.get_or_create(
                title=service_data['title'],
                defaults=service_data
            )
            if created:
                self.stdout.write(f'Created service: {service.title}')

        # Create Education
        education_data = [
            {
                'institution': 'Ardhi University',
                'degree': 'Bachelor of Science in Computer Systems and Networks',
                'field_of_study': 'Computer Systems and Networks',
                'start_date': date(2022, 10, 10),
                'end_date': date(2025, 7, 18),
                'is_current': False,
                'description': 'Focused on software engineering, algorithms, and machine learning. Graduated with honors.'
            },
            {
                'institution': 'Ardhi Institute Morogoro',
                'degree': 'Diploma in Geomatics',
                'field_of_study': 'Geomatics',
                'start_date': date(2018, 10, 15),
                'end_date': date(2021, 7, 23),
                'is_current': False,
                'description': 'creating and making of house plans, making observations, and creating of topographic maps.'
            }
        ]

        for edu_data in education_data:
            education, created = Education.objects.get_or_create(
                institution=edu_data['institution'],
                degree=edu_data['degree'],
                defaults=edu_data
            )
            if created:
                self.stdout.write(f'Created education: {education.degree} at {education.institution}')

        # Create Experience
        experience_data = [
            {
                'company': 'Inventions Technologies',
                'position': 'Systems Integrator Engineer',
                'start_date': date(2026, 1, 1),
                'end_date': None,
                'is_current': True,
                'description': 'Designing, deploying and integrating VoIP, call center and CRM solutions for clients, connecting telephony with business systems through SIP, Asterisk and REST APIs.'
            },
            {
                'company': 'Lahempo Tech',
                'position': 'Founder & Developer',
                'start_date': date(2022, 1, 1),
                'end_date': None,
                'is_current': True,
                'description': 'Founded and run Lahempo Tech, my own software startup, designing and building web applications and AI solutions for clients.'
            },
            {
                'company': 'Briq Solution',
                'position': 'Frontend Developer',
                'start_date': date(2025, 7, 18),
                'end_date': date(2025, 8, 18),
                'is_current': False,
                'description': 'Handling frontend using react and typescript'
            },
            {
                'company': 'Nairi Company',
                'position': 'Backend Developer',
                'start_date': date(2025, 7, 14),
                'end_date': date(2025, 8, 18),
                'is_current': False,
                'description': 'handling databases, authentication and APIs for scalable and efficient application'
            }
        ]

        for exp_data in experience_data:
            experience, created = Experience.objects.get_or_create(
                company=exp_data['company'],
                position=exp_data['position'],
                defaults=exp_data
            )
            if created:
                self.stdout.write(f'Created experience: {experience.position} at {experience.company}')

        self.stdout.write(
            self.style.SUCCESS('Successfully loaded initial data for Veryniceglory Lazaro portfolio!')
        )
