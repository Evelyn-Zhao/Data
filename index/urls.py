from django.urls import path

from . import views

urlpatterns = [
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    path('register', views.register, name='register'),
    path('me', views.me, name='me'),
    path('index', views.index),
    #path('add/',views.add, name='add'),
    #path('add2/<int:a>/<int:b>/',views.old_add2_redirect),
    #path('new_add2/<int:a>/<int:b>/', views.add2, name='add2'),
    #path('renderAdd/', views.renderAdd, name='renderAdd'),
    #path('', views.index, name='index'),
]