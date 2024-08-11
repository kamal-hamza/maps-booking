from django.urls import path
from .import views

urlpatterns = [
    path('signup/', views.signup.as_view(), name='signup'),
    path('login/', views.login.as_view(), name='login'),
    path('create-list-room/', views.RoomListCreateView.as_view(), name='add-room'),
    path('create-list-room/<int:pk>/', views.RoomRetriveView.as_view(), name='room-detail'),
    path('update-destroy-room/', views.RoomDetailView.as_view(), name='update-destroy-room'),
]