from django.shortcuts import render
from django.db import connection, IntegrityError
from django.http import HttpResponse, JsonResponse
from django.http import FileResponse
from index.models import Users, Experiment,Data
from django.conf import settings
import json, os, glob
from pprint import pprint
import urllib
# Create your views here.

expFileDirectory = "/Users/Evelyn/projects/Data_Management_Tool/Experiment"

def getDataList(request):
    data = Data.objects.all()
    
    a = []
    for d in data:
        item = d.__dict__
        if "_state" in item:
            del item["_state"]
        print(item)
        a.append(item)
    return JsonResponse({ 'data': a })

def getDataDetails(request):
    return 1

def downloadData(request):
    id = request.GET['id']
    
    data = Data.objects.filter(dataid = id).values()[0]
    print(data)
    filetype = data["datatype"].lower()
    urlname = "Data_"+id+"."+filetype
    filename = str(data["exp_id"])+"_"+id+"."+filetype
    print(urlname)
    print(filename)
    try:
        print(os.path.join(settings.DATA_DIRS, urlname))
        print(os.path.join(settings.DOWNLOAD_DIRS,filename))
        file=open(os.path.join(settings.DATA_DIRS, urlname),'rb')
        response =HttpResponse(file)
        response['Content-Type']='application/octet-stream'
        response['Content-Disposition']='attachment;filename="{0}"'.format(filename) 
   
        return response
    except Exception as e:
        
        print(e)

    #urllib.urlretrieve(os.path.join(settings.DATA_DIR, urlname), os.path.join(DOWNLOAD_DIRS,filename))
    

def getExpDetails(request):
    id = request.GET['id']
    exp = Experiment.objects.filter(expid = id).values()[0]
    
    with open(os.path.join(settings.EXP_DIRS, f'Exp_{id}.json')) as f:
        data = json.load(f)
        experimeters = []
        datainfo=[]
        for exp in data["experimenters"]:
            user = Users.objects.filter(usrname = exp).values()[0]
            experimeters.append(user['usrfirstname']+" "+user['usrlastname'])
        data["experimenters"] = experimeters
        for dataele in data["data"]:
            datalist = {}
            d = Data.objects.filter(dataid = dataele).values()[0]
            datalist["dataid"] = dataele
            datalist["datadescription"] = d["datadescription"]
            datainfo.append(datalist)
        data["data"] = datainfo
    return JsonResponse(data)

def getAllMyExp(request):
    if 'usrname' in request.session:
        myexps = []
        for jsonfile in glob.glob(os.path.join(settings.EXP_DIRS, '*.json')):
            with open(os.path.join(settings.EXP_DIRS, jsonfile), encoding='utf-8', mode='r') as f:
                data = json.load(f)
                for experimenter in data["experimenters"]:
                    if experimenter == request.session['usrname']:
                        myexps.append(data)
    return JsonResponse({'myexps': myexps})

def claim(request):
    #TODO: Add experimenter's name into experimenter list
    id = request.GET['id']
    tmp = {}
    if 'usrname' in request.session:
        with open(os.path.join(settings.EXP_DIRS, f'Exp_{id}.json'), mode='r') as f:
            data = json.load(f)
            user_exist = False
            for exp in data["experimenters"]:
                if exp == request.session['usrname']:
                    user_exist = True
                    
            if user_exist:
                return JsonResponse({'message': 'You are already the experimenter of this experiment'})
            else:
                data["experimenters"].append(request.session['usrname'])
                tmp = data
        with open(os.path.join(settings.EXP_DIRS, f'Exp_{id}.json'), mode='w') as outfile:
            json.dump(tmp, outfile)
            return JsonResponse({'message': 'Claim Successfully'})


def getAllClaimableExp(request):
    #TODO: only experiments with valide json exp file can be presented
    cexps = []
    claimableExps = Experiment.objects.filter(exptype = "Available").values()
    for claimableExp in claimableExps:
        print(claimableExp)
        cexps.append(claimableExp)
    return JsonResponse({'cexps': cexps})


def manageExpDetail(request):
    #if 'usrname' in request.session:
    return JsonResponse({'error': 'error occurred'})


#not fully implemented, need to call the user table and exp_relation table 
def getExperimentList(request):
    a = []
    for jsonfile in glob.glob(os.path.join(settings.EXP_DIRS, '*.json')):
        print(settings.EXP_DIRS+jsonfile)
       
        e = {
            "expid": "",
            "expname": "",
            "exptype": "",
            "description":"",
        }
        with open(os.path.join(settings.EXP_DIRS, jsonfile), encoding='utf-8', mode='r') as f:
            data = json.load(f)
            e["expid"] = data["expid"]
            e["expname"] = data["expname"]
            e["exptype"] = data["exptype"]
            e["description"] = data["description"]
        a.append(e)
    return JsonResponse({ 'exps': a })

def newexp(request):
    #TODO: need to unify the content retrieved from webpage and the information stored in the JSON object
    #expid, expname, and exptype are stored in both db and json file
    #the rest attributes are stored in the json file only
    json_object = {
        "expid": 0,
        "expname": request.POST["expname"],
        "exptype": request.POST["exptype"],
        "related_exps": [],
        "expperiod": request.POST["expperiod"],
        "description": request.POST["expdescription"],
        "experimenters": [],
        "data": [],
        "outcomes": []
    }

    #create a new exp in Experiment table
    #one row of data requires an id and exp_name 
    try:
        #cannot specify the expid why? delete is delete, that's it 
        exp = Experiment.objects.create(expname = request.POST["expname"], exptype = request.POST["exptype"])
        
        # TODO: need to split the experimenters string by comma
        experimenter_list = request.POST["expers"].split(",")
        print(experimenter_list)
        # TODO: then verify whether user already exists in the db, if not create user
        for exper in experimenter_list:
            exper_names = exper.strip().split(" ")
            print(exper_names)
            print(exper_names[0])
            print(exper_names[1])
            if Users.objects.filter(usrfirstname = exper_names[0], usrlastname = exper_names[1]).exists():
                experimenter = Users.objects.filter(usrfirstname = exper_names[0], usrlastname = exper_names[1]).values()[0]
                print("experimenter exists")
                json_object["experimenters"].append(experimenter['usrname'])
            else:
                print("experimenter does not exist")
                name = exper_names[0] + "_" + exper_names[1]
                usr = Users.objects.create(usrname = name, usrpwd = "123456",usremail = " " ,usrauthority = 1, usrfirstname = exper_names[0], usrlastname = exper_names[1])
                usr = usr.__dict__
                json_object["experimenters"].append(usr['usrname'])
        print(json_object)
    except:
        return JsonResponse({'error': 'error occurred'})
    else:
        response = exp.__dict__
        if "_state" in response:
            del response["_state"]
        print(response)
        #also need to create a json file with corresponding id name, and store the data in the json file 
        json_object["expid"] = response['expid']
        with open(expFileDirectory + "/Exp_" + str(response["expid"])+".json", 'w') as outfile:
            json.dump(json_object, outfile)
        return JsonResponse(response)
    
def register(request):

    #TODO: add fisrt name and last name 
   
    json_object = {
        "username": request.POST["username"],
        "password": request.POST["password"],
        "useremail": request.POST["useremail"],
        "userfisrtname": request.POST["userfirstname"],
        "userlastname": request.POST["userlastname"],
    }

    #create an object 
    try:
        user = Users.objects.create(usrname = request.POST["username"],usrpwd = request.POST["password"],usremail = request.POST["useremail"] ,usrauthority = 1, usrfirstname = request.POST["userfirstname"], usrlastname = request.POST["userlastname"])
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

def showPersonalInfo(request):
    if 'usrname' in request.session:
        print("session: "+request.session['usrname'])
        try:
            user = Users.objects.filter(usrname = request.session['usrname']).values()[0]
            return JsonResponse({ 'user': user })
        except IndexError:
            return JsonResponse({'error': 'user is not found'})

def updatePersonalInfo(request):
    json_object = {
        "useremail": request.POST["useremail"],
        "userfisrtname": request.POST["userfirstname"],
        "userlastname": request.POST["userlastname"],
    }

    if 'usrname' in request.session:
        print("session: "+request.session['usrname'])
        try:
            
            Users.objects.filter(usrname = request.session['usrname']).values[0].update(usremail = request.POST["useremail"],usrfirstname = request.POST["userfirstname"],usrlastname = request.POST["userlastname"])
            #user = Users(usrname = request.session['usrname'])
           
           
            user = Users.objects.filter(usrname = request.session['usrname']).values[0]
            print(user)
            return JsonResponse({'user': user })
        except Exception as e:
            print(e)
            return JsonResponse({'error': 'update information was not successful'})

