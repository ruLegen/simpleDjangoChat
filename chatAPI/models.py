# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db.models import Model
from django.db import models

class Message (models.Model):
    messageText = models.CharField(max_length= 999)
    sender = models.CharField(max_length=999)
# Create your models here.
