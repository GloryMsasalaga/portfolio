from portfolio.models import Skill

def update_skills():
    # 1. Update Existing Skills with Icons
    skills_map = {
        'Python': 'fab fa-python',
        'JavaScript': 'fab fa-js',
        'Django': 'fab fa-python', # Or generic code if preferred, but usually Python logo is used
        'React': 'fab fa-react',
        'TensorFlow': 'fas fa-brain', # TF logo not always in free FA, brain is good for ML
        'PostgreSQL': 'fas fa-database', 
        'Docker': 'fab fa-docker',
        'AWS': 'fab fa-aws',
        'Git': 'fab fa-git-alt',
        'HTML': 'fab fa-html5',
    }

    for name, icon in skills_map.items():
        try:
            skill = Skill.objects.get(name=name)
            skill.icon_class = icon
            skill.save()
            print(f"Updated {name} to {icon}")
        except Skill.DoesNotExist:
            print(f"{name} not found")

    # 2. Remove "Machine Learning" generic skill
    try:
        Skill.objects.get(name="Machine Learning").delete()
        print("Deleted generic Machine Learning skill")
    except Skill.DoesNotExist:
        print("Generic Machine Learning skill not found or already deleted")

    # 3. Add New Skills
    new_skills = [
        {'name': 'Scikit-learn', 'proficiency': 85, 'category': 'Machine Learning', 'icon_class': 'fas fa-brain'}, # No official scikit icon in FA free
        {'name': 'Pandas', 'proficiency': 90, 'category': 'Data Science', 'icon_class': 'fas fa-table'},
        {'name': 'NumPy', 'proficiency': 88, 'category': 'Data Science', 'icon_class': 'fas fa-layer-group'},
        {'name': 'Seaborn', 'proficiency': 85, 'category': 'Data Visualization', 'icon_class': 'fas fa-chart-area'},
        {'name': 'Matplotlib', 'proficiency': 85, 'category': 'Data Visualization', 'icon_class': 'fas fa-chart-bar'},
        {'name': 'Flutter', 'proficiency': 80, 'category': 'Mobile Development', 'icon_class': 'fas fa-mobile-alt'}, # fab fa-flutter might not be in the set
        {'name': 'MongoDB', 'proficiency': 82, 'category': 'Databases', 'icon_class': 'fas fa-database'}, # fas fa-database is standard
    ]

    for skill_data in new_skills:
        skill, created = Skill.objects.get_or_create(
            name=skill_data['name'],
            defaults={
                'proficiency': skill_data['proficiency'],
                'category': skill_data['category'],
                'icon_class': skill_data['icon_class']
            }
        )
        if not created:
            skill.icon_class = skill_data['icon_class']
            skill.category = skill_data['category'] # Update category too
            skill.save()
            print(f"Updated {skill.name}")
        else:
            print(f"Created {skill.name}")

if __name__ == '__main__':
    update_skills()
