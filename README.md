# Glory Lazaro Portfolio

A modern Django portfolio website for Glory Lazaro (VeryniceGlory), showcasing skills as a Software Developer and AI/ML Engineer.

## Features

- **Django Backend**: Robust backend for handling contacts and service orders
- **Responsive Design**: Mobile-first responsive design
- **Contact System**: Contact form with email integration
- **Project Showcase**: Display GitHub projects with links
- **Admin Panel**: Django admin for content management

## Technologies Used

### Frontend
- HTML5, CSS3, JavaScript
- Bootstrap 5
- Cool Ui
- Font Awesome icons

### Backend
- Django 5.0.1
- Django REST Framework
- SQLite (default, can be changed to PostgreSQL/MySQL)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/glorymsasalaga/portfolio.git
   cd portfolio
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up the database**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create a superuser**
   ```bash
   python manage.py createsuperuser
   ```

6. **Collect static files**
   ```bash
   python manage.py collectstatic
   ```

7. **Run the development server**
   ```bash
   python manage.py runserver
   ```

8. **Visit the website**
   Open your browser and go to `http://localhost:8000`

## Project Structure

```
portfolio_project/
├── portfolio/                 # Main Django app
│   ├── models.py             # Database models
│   ├── views.py              # Views and API endpoints
│   ├── urls.py               # URL routing
│   ├── serializers.py        # DRF serializers
│   ├── admin.py              # Admin configuration
│   └── migrations/           # Database migrations
├── portfolio_project/        # Django project settings
│   ├── settings.py           # Project settings
│   ├── urls.py               # Main URL configuration
│   ├── wsgi.py               # WSGI configuration
│   └── asgi.py               # ASGI configuration
├── static/                   # Static files
│   ├── css/
│   │   └── style.css         # Main stylesheet
│   ├── js/
│   │   ├── main.js           # Main JavaScript
│   │   ├── theme.js          # Theme management
│   │   ├── hero-3d.js        # 3D hero animations
│   │   └── skills-animation.js # Skills animations
│   └── assets/               # Images and other assets
├── templates/                # HTML templates
│   ├── base.html             # Base template
│   ├── index.html            # Home page
│   ├── about.html            # About page
│   └── contact.html          # Contact page
├── requirements.txt          # Python dependencies
└── manage.py                 # Django management script
```

## Configuration

### Settings
- Update `SECRET_KEY` in `settings.py` for production
- Configure email settings for contact form
- Set `DEBUG = False` for production
- Update `ALLOWED_HOSTS` for production

### Database
- Default: SQLite (for development)
- For production, consider PostgreSQL or MySQL

### Static Files
- Development: Served by Django
- Production: Configure with WhiteNoise or a CDN

## Features to Add

### Content Management
1. **Add Projects**: Use Django admin to add your GitHub projects
2. **Add Skills**: Add your technical skills with proficiency levels
3. **Add Services**: List services you offer with pricing
4. **Add Education**: Add your educational background
5. **Add Experience**: Add your work experience

### Customization
1. **Colors**: Update CSS variables in `style.css`
2. **Content**: Update templates with your information

## API Endpoints

- `GET /api/projects/` - List all projects
- `POST /api/contact/` - Submit contact form
- `POST /api/service-order/` - Submit service order
- `GET /api/skills/` - List all skills
- `GET /api/services/` - List all services

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

**Glory Lazaro (VeryNiceGlory)**
- Email: contact@glorylazaro.dev
- GitHub: [@glorymsasalaga](https://github.com/glorymsasalaga)
- LinkedIn: [Glory Lazaro](https://linkedin.com/in/glorymsasalaga)

## Deployment

### Deploy.tz
1. Create account in https://deploy.tz
2. Create Shipfile in your project folder
3. Make sure you have requirements.txt
4. Create application in deploy.tz
5. Write name of application for domain
6. Insert stack i.e python or go
7. Paste github repo in github repo box

### Digital Ocean/AWS
1. Set up a server with Python 3.9+
2. Install dependencies
3. Configure Gunicorn and Nginx
4. Set up SSL certificate
5. Configure environment variables

## Performance Optimization

- Enable Django's caching framework
- Optimize images and static files
- Use a CDN for static files
- Enable gzip compression
- Implement lazy loading for images

## Security

- Keep Django and dependencies updated
- Use environment variables for sensitive data
- Enable CSRF protection
- Configure secure headers
- Use HTTPS in production
