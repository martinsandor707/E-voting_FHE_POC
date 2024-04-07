from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response

from .models import User, Vote
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import json
import bcrypt
from django.contrib.sessions.backends.db import SessionStore

@api_view(['GET', 'POST'])
def index(request):
    if 'visitedNr' not in request.session or request.session['visitedNr'] > 5:
        request.session.flush()
        request.session['visitedNr']=0
    request.session['visitedNr']+=1

    return Response(f"Hi {request.session['visitedNr']} ", status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse({'users': serializer.data})
    if request.method == 'POST':
        data = json.loads(request.body)

        if not User.objects.filter(email=data['email']).exists():
            password = data['password'].encode()
            hashed = bcrypt.hashpw(password, bcrypt.gensalt())
            serializer = UserSerializer(data={'email': data['email'], 'password': hashed.decode()})
            #return Response(f"{hashed}      {hashed.decode()}", status=status.HTTP_406_NOT_ACCEPTABLE)
            if serializer.is_valid():
                serializer.save()
                return Response(password, status=status.HTTP_201_CREATED)
        return Response("Done goofed", status=status.HTTP_406_NOT_ACCEPTABLE)


#Basic CRUD functionality
@api_view(['GET', 'PUT', 'DELETE', 'PATCH'])
def user_detail(request, id):
    try:
        user = User.objects.get(email=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PATCH':
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#Attempt login by comparing plaintext input to password hash. Creates new session on success
@api_view(['POST'])
def user_login(request):
    data = json.loads(request.body)
    try:
        user = User.objects.get(email=data['email'])
    except User.DoesNotExist:
        return Response('User not found!', status=status.HTTP_404_NOT_FOUND)
    if bcrypt.checkpw(data['password'].encode(), user.password.encode()):       #Need to convert both passwords to byte string for bcrypt
        s = SessionStore()
        s['email'] = data['email']
        s.create()
        return Response({'sessionKey': s.session_key},status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def token_test(request):
    email=SessionStore(session_key=request.headers['Authorization'])['email']
    return Response(email, status=status.HTTP_200_OK)