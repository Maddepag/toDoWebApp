from django.db import models
import string
import random


def generate_unique_code():
    length = 5  
    
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if sharedList.objects.filter(code=code).count() == 0:
            break
    return code



# Create your models here.
class sharedList(models.Model):
    
    code = models.CharField(max_length=5, default = generate_unique_code, unique=True)
    creator = models.CharField(max_length=50, unique=True)
    guest_edit_list = models.BooleanField(null = False, default=True)
    created_at = models.DateTimeField(auto_now_add=True)


