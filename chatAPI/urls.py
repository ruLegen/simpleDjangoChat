from django.conf.urls import url, include
import views
urlpatterns = [
    url('^$',views.index),
    url(r'^addmessage$',views.addmessage),
    url(r'^getmessage$', views.getmessage),
    url(r'^getlastid$', views.getlastID),

]
