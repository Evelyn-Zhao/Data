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

class Experiment (models.Model):
    expname = models.CharField(max_length=50, primary_key=True)
    #year and month would be fine
    expdate = models.DateField()
    parent = models.ForeignKey('Experiment', on_delete = models.CASCADE)
    expdescriprion = models.CharField(max_length=500)

class Data (models.Model):
    dataname = models.CharField(max_length=50, primary_key=True)
    datatype = models.DateField()
    datadescription = models.CharField(max_length=500)
    datadate = models.CharField(max_length=40)
    exp = models.ForeignKey('Experiment', on_delete = models.CASCADE)

#The table stores the info about experimenter
class Experimenter (models.Model):
    experid = models.AutoField(primary_key=True)
    expername = models.CharField(max_length=20)
    expertitle =  models.CharField(max_length=10)
    experinstitute = models.CharField(max_length=40)
    user = models.OneToOneField(
        Users,
        on_delete = models.CASCADE,
    )
