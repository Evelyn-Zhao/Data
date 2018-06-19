from django.shortcuts import render
from django.db import connection, IntegrityError
from django.http import HttpResponse, JsonResponse
from index.models import Users
import json
# Create your views here.

def register(request):


    json_object = {
        "username": request.POST["username"],
        "password": request.POST["password"],
        "useremail": request.POST["useremail"],
    }

    #create an object 
    try:
        user = Users.objects.create(usrname = request.POST["username"],usrpwd = request.POST["password"],usremail = request.POST["useremail"] ,usrauthority = 1)
    except IntegrityError:
        # user already exists
        return JsonResponse({'error': 'user already exists'})
    else:
        response = user.__dict__
        if "_state" in response:
            del response["_state"]
        return JsonResponse(response)

def logout(request):
    del request.session['usrname'] 
    return JsonResponse({})

def me(request):
    if 'usrname' in request.session:
        print("session: "+request.session['usrname'])
        #TRANSFER THE CLASS INTO DICT
        user = Users.objects.filter(usrname = request.session['usrname']).values()[0]
        return JsonResponse({ 'user': user })
    else :
        return JsonResponse({})

def login(request):
    #print(request.data)
    #request.read()
    #data = json.loads(request.body)
    json_object = {
        
        "username": request.POST["username"],
        "password": request.POST["password"],
        
    }
    try:
        user = Users.objects.filter(usrname = request.POST["username"]).values()[0]
        print(user)
        if (user['usrpwd'] == request.POST["password"]):
            request.session['usrname'] = user['usrname']
            request.session.save()
            request.session.modified = True
            print("session: "+request.session['usrname'])
            return JsonResponse({ 'user': user })
        else: 
            return JsonResponse({'error': 'password is not correct'})
    except IndexError:
        return JsonResponse({'error': 'user is not found'})

def index(request):
    return render(request, 'index.html', {})