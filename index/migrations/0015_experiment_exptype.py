# Generated by Django 2.0.1 on 2018-08-27 07:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0014_auto_20180827_0726'),
    ]

    operations = [
        migrations.AddField(
            model_name='experiment',
            name='exptype',
            field=models.CharField(default='closed', max_length=10),
            preserve_default=False,
        ),
    ]