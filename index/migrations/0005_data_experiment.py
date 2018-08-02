# Generated by Django 2.0.1 on 2018-06-28 04:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0004_auto_20180605_0142'),
    ]

    operations = [
        migrations.CreateModel(
            name='Data',
            fields=[
                ('dataid', models.IntegerField(primary_key=True, serialize=False)),
                ('dataname', models.CharField(max_length=50)),
                ('datapath', models.CharField(max_length=50)),
                ('refer_no', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Experiment',
            fields=[
                ('expid', models.IntegerField(primary_key=True, serialize=False)),
                ('expname', models.CharField(max_length=50)),
            ],
        ),
    ]