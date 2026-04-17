import os
import django
from django.db import connection

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'creatorpath_backend.settings')
django.setup()

print(connection.introspection.table_names())
