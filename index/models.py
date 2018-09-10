from django.db import models

# Create your models here.
class Users (models.Model):
    #usrid = models.CharField(max_length=10, primary_key=True)
    #usrid = models.AutoField(default=100000, primary_key=True)
    usrname = models.CharField(max_length=20, primary_key=True)
    usrfirstname = models.CharField(max_length=20)
    usrlastname = models.CharField(max_length=20)
    usrpwd = models.CharField(max_length=40)
    usremail = models.CharField(max_length=30, blank=True)
    usrauthority = models.IntegerField() 
    
   
    
    #def info():
    #    return usrinfo

#the id of ecperimenter will be used to find the location of data files
class Experiment (models.Model):
    expid = models.AutoField(primary_key=True) 
    expname = models.CharField(max_length=200)
    exptype = models.CharField(max_length=10)

class Data (models.Model):
    dataid = models.IntegerField(primary_key=True) 
    datatype = models.CharField(max_length=50)
    datadescription = models.CharField(max_length=400)
    exp = models.ForeignKey(Experiment, on_delete=models.CASCADE)
    

