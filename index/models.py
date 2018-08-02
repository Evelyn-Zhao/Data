from django.db import models

# Create your models here.
class Users (models.Model):
    #usrid = models.CharField(max_length=10, primary_key=True)
    #usrid = models.AutoField(primary_key=True)
    usrname = models.CharField(max_length=20, primary_key=True)
    usrpwd = models.CharField(max_length=40)
    usremail = models.CharField(max_length=30)
    usrauthority = models.IntegerField() 

    #def info():
    #    return usrinfo

#the id of ecperimenter will be used to find the location of data files
class Experiment (models.Model):
    expid = models.IntegerField(primary_key=True) 
    expname = models.CharField(max_length=50)

class Data (models.Model):
    dataid = models.IntegerField(primary_key=True) 
    dataname = models.CharField(max_length=50)
    datapath = models.CharField(max_length=300)
    datatype = models.CharField(max_length=50)
    exp = models.ForeignKey(Experiment, on_delete=models.CASCADE)
    refer_no = models.IntegerField()

