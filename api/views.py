from django.shortcuts import render
from rest_framework import generics, status 
from .serializers import sharedListSerializer, createListSerializer
from .models import sharedList
from rest_framework.views import APIView
from rest_framework.response import Response



# Create your views here.

class sharedListView(generics.ListAPIView):
    queryset = sharedList.objects.all()
    serializer_class = sharedListSerializer

class GetListView(APIView):
    serializer_class = sharedListSerializer
    lookup_url_kwarg = 'code'

    def get(self,request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            SharedList = sharedList.objects.filter(code=code)
            if len(SharedList) > 0:
                data = sharedListSerializer(SharedList[0]).data
                data['is_creator'] = self.request.session.session_key == SharedList[0].creator 
                return Response(data, status=status.HTTP_200_OK)
            return Response({'List Not Found': 'Invalid List Code'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'Bad Request': 'Code Parameter Not Found In Request'}, status=status.HTTP_404_NOT_FOUND)

class createListView(APIView):
    serializer_class = createListSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_edit_list = serializer.data.get('guest_edit_list')
            creator = self.request.session.session_key
            queryset = sharedList.objects.filter(creator=creator)
            if queryset.exists():
                SharedList = queryset[0]
                SharedList.guest_edit_list = guest_edit_list
                SharedList.save(update_fields=['guest_edit_list',])
                return Response(sharedListSerializer(SharedList).data, status=status.HTTP_200_OK)
            else:
                SharedList = sharedList(creator=creator, guest_edit_list=guest_edit_list)
                SharedList.save()
                return Response(sharedListSerializer(SharedList).data, status=status.HTTP_201_CREATED)
            
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST) 


