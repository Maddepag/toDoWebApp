from django.urls import path
from .views import sharedListView, createListView, GetListView 

urlpatterns = [
    path('list', sharedListView.as_view()),
    path('create-list', createListView.as_view()),
    path('get-list', GetListView.as_view())
]