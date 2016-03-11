from django import template
from django.conf import settings
import json

register = template.Library()

@register.simple_tag
def elixir(file):
    with open('static/build/rev-manifest.json') as f:
        data = json.load(f)
        return settings.STATIC_URL + 'build/' + data.get(file)
