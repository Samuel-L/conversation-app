from rest_framework import permissions

class IsPartOfConversation(permissions.BasePermission):
    """
    Custom permission that only allows user part of conversation
    to edit and view conversation
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.user_a == request.user or obj.user_b == request.user
