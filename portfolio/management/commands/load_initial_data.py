from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_date
from portfolio.models import Project, Service, Skill, Education, Experience
from datetime import date

class Command(BaseCommand):
    help = 'Load initial data for Glory Lazaro portfolio'

    def handle(self, *args, **options):
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
                'title': 'AI-Powered Chat Application',
                'description': 'A real-time chat application with AI-powered message suggestions and sentiment analysis. Built with Django, React, and OpenAI API.',
                'technologies': 'Python, Django, React, OpenAI API, WebSockets, PostgreSQL',
                'github_link': 'https://github.com/glorymsasalaga/ai-chat-app',
                'live_link': 'https://ai-chat.glorylazaro.dev'
            },
            {
                'title': 'E-commerce Analytics Dashboard',
                'description': 'A comprehensive analytics dashboard for e-commerce businesses with real-time data visualization and machine learning insights.',
                'technologies': 'Python, Django, Chart.js, Pandas, Scikit-learn, Redis',
                'github_link': 'https://github.com/glorymsasalaga/ecommerce-analytics',
                'live_link': 'https://analytics.glorylazaro.dev'
            },
            {
                'title': 'Smart Home IoT System',
                'description': 'An IoT system for smart home automation with mobile app control and machine learning for energy optimization.',
                'technologies': 'Python, Django REST Framework, React Native, Arduino, TensorFlow',
                'github_link': 'https://github.com/glorymsasalaga/smart-home-iot',
            },
            {
                'title': 'Image Classification API',
                'description': 'A REST API for image classification using deep learning models. Supports multiple model architectures and real-time inference.',
                'technologies': 'Python, FastAPI, TensorFlow, Docker, AWS S3',
                'github_link': 'https://github.com/glorymsasalaga/image-classification-api',
                'live_link': 'https://api.glorylazaro.dev/classify'
            },
            {
                'title': 'Portfolio Website',
                'description': 'This responsive portfolio website with 3D animations and modern design. Built with Django and Three.js.',
                'technologies': 'Python, Django, Three.js, Bootstrap 5, CSS3',
                'github_link': 'https://github.com/glorymsasalaga/portfolio',
                'live_link': 'https://glorylazaro.dev'
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
                'institution': 'University of Technology',
                'degree': 'Bachelor of Science',
                'field_of_study': 'Computer Science',
                'start_date': date(2018, 9, 1),
                'end_date': date(2022, 6, 1),
                'is_current': False,
                'description': 'Focused on software engineering, algorithms, and machine learning. Graduated with honors.'
            },
            {
                'institution': 'AI Institute',
                'degree': 'Certificate',
                'field_of_study': 'Machine Learning Engineering',
                'start_date': date(2022, 1, 1),
                'end_date': date(2022, 8, 1),
                'is_current': False,
                'description': 'Specialized training in deep learning, neural networks, and MLOps practices.'
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
                'company': 'TechCorp Solutions',
                'position': 'Senior Full-Stack Developer',
                'start_date': date(2023, 1, 1),
                'end_date': None,
                'is_current': True,
                'description': 'Lead development of scalable web applications and AI-powered features. Mentor junior developers and collaborate with cross-functional teams.'
            },
            {
                'company': 'DataFlow Analytics',
                'position': 'Machine Learning Engineer',
                'start_date': date(2022, 6, 1),
                'end_date': date(2022, 12, 31),
                'is_current': False,
                'description': 'Developed and deployed machine learning models for predictive analytics. Worked with large datasets and implemented MLOps pipelines.'
            },
            {
                'company': 'StartupXYZ',
                'position': 'Junior Software Developer',
                'start_date': date(2021, 6, 1),
                'end_date': date(2022, 5, 31),
                'is_current': False,
                'description': 'Built web applications using Django and React. Participated in agile development processes and code reviews.'
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
            self.style.SUCCESS('Successfully loaded initial data for Glory Lazaro portfolio!')
        )
