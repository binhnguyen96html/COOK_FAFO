# Generated by Django 5.0.7 on 2024-07-17 02:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='React',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('image', models.JSONField()),
                ('category', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('recipes', models.JSONField()),
                ('rating', models.FloatField()),
                ('numReviews', models.IntegerField()),
                ('cookList', models.JSONField()),
            ],
        ),
    ]
