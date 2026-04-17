import os
import django
from django.db import connection

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'creatorpath_backend.settings')
django.setup()

with connection.cursor() as cursor:
    cursor.execute("DESCRIBE users")
    columns = cursor.fetchall()
    for col in columns:
        print(col)
