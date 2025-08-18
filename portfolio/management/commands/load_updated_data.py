from django.core.management.base import BaseCommand
from django.core.management import call_command
import os

class Command(BaseCommand):
    help = 'Load updated data for production deployment'

    def handle(self, *args, **options):
        self.stdout.write('Loading all updated portfolio data from Django admin...')
        
        # Load complete portfolio data (all models)
        data_files = [
            'complete_portfolio_data.json',  # All current data from admin
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
                
        self.stdout.write(
            self.style.SUCCESS('✅ All Django admin data synchronized!')
        )
