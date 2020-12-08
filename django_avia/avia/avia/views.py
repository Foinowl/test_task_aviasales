# -*- coding: utf-8 -*-
from django.http import JsonResponse
from django.views.generic import View

from .parser import Itenary


class FindView(View):
    method_name = None

    def get(self, request, *args, **kwargs):
        itenary = Itenary(
            source=request.GET.get('source'),
            dest=request.GET.get('dest'),
            back=bool(request.GET.get('back')),
            adult=request.GET.get('adult'),
            child=request.GET.get('child'),
            infant=request.GET.get('infant'),
  
        )
        data = getattr(itenary, self.method_name)()
        return JsonResponse({'success': True, 'data': data}, safe=False)
