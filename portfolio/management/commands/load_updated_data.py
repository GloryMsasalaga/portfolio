from django.core.management.base import BaseCommand
from django.core.management import call_command
import os

class Command(BaseCommand):
    help = 'Load updated data for production deployment'

    def handle(self, *args, **options):
        self.stdout.write('Loading updated portfolio data...')
        
        # Load portfolio data, updated services data, and about data
        data_files = [
            'portfolio_data.json', 
            'updated_services_data.json',
            'about_data.json'
        ]
        
        for data_file in data_files:
            if os.path.exists(data_file):
                try:
                    self.stdout.write(f'Loading {data_file}...')
                    call_command('loaddata', data_file)
                    self.stdout.write(
                        self.style.SUCCESS(f'Successfully loaded {data_file}')
                    )
                except Exception as e:
                    self.stdout.write(
                        self.style.ERROR(f'Error loading {data_file}: {e}')
                    )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Data file {data_file} not found')
                )
