# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render,render_to_response
from django.http import HttpResponse
from django.core.serializers import serialize
from models import Message

# Create your views here.
def index(request):
    return render_to_response('index.html')

def addmessage(request):
    msgText = request.POST['msg']
    senderName = request.POST['sender']
    newMessage = Message(messageText=msgText,sender=senderName);
    newMessage.save();
    return HttpResponse(status=200)

def getmessage(request):
    lastID = request.POST['lastID']
    messages = Message.objects.filter(pk__gt=lastID)

    jsonQuerySet = serialize('json',messages)
    return HttpResponse(jsonQuerySet,content_type='application/json',)

def getlastID(request):
    lastMessage = Message.objects.last();
    if lastMessage:
        return HttpResponse(lastMessage.id)
    else:
        return  HttpResponse("");

