# Generated by Django 2.0.1 on 2018-08-27 03:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0011_auto_20180824_0943'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='data',
            name='dataname',
        ),
        migrations.RemoveField(
            model_name='data',
            name='datapath',
        ),
        migrations.RemoveField(
            model_name='users',
            name='usrname',
        ),
        migrations.AddField(
            model_name='users',
            name='usrid',
            field=models.AutoField(primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]
