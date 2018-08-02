from django.shortcuts import render
from django.db import connection, IntegrityError
from django.http import HttpResponse, JsonResponse
from index.models import Users, Experiment,Data
from django.conf import settings
import json, os
from pprint import pprint
# Create your views here.

def getDataList(request):
    data = Data.objects.all()
    
    a = []
    for d in data:
        item = d.__dict__
        if "_state" in item:
            del item["_state"]
 #       with open(os.path.join(settings.EXP_DIRS, f'exp_{e["expid"]}.json')) as f:
 #           data = json.load(f)
 #           pprint(data["description"])
 #           e["description"] = data["description"]
 #           e["year"] = data["year"]
 #           e["month"] = data["month"]
 #           e["date"] = data["date"]
        print(item)
        a.append(item)
    return JsonResponse({ 'data': a })

def getDataDetails(request):
    return 1

def downloadData(request):
    id = request.GET['id']
    data = Dats.objects.filter(dataid = id).values()[0]
    pprint(data)
    return 1

def getExpDetails(request):
    id = request.GET['id']
    exp = Experiment.objects.filter(expid = id).values()[0]
    with open(os.path.join(settings.EXP_DIRS, f'exp_{id}.json')) as f:
        data = json.load(f)
        data["id"] = exp["expid"]
        data["name"] = exp["expname"]
        #data["experimenters"].map = 
        pprint(data)
        return JsonResponse(data)
    
#def getExperimenter(x):
#   return Users.objects.filter(usrname = request.session['usrname']).values()[0]

#not fully implemented, need to call the user table and exp_relation table 
def getExperimentList(request):
    experiments = Experiment.objects.all()
    
    a = []
    for exp in experiments:
        e = exp.__dict__
        if "_state" in e:
            del e["_state"]
        with open(os.path.join(settings.EXP_DIRS, f'exp_{e["expid"]}.json')) as f:
            data = json.load(f)
            pprint(data["description"])
            e["description"] = data["description"]
            e["year"] = data["year"]
            e["month"] = data["month"]
            e["date"] = data["date"]
        print(e)
        a.append(e)
    return JsonResponse({ 'exps': a })

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