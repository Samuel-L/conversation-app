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

class IsSenderOrReceiver(permissions.BasePermission):
    """
    Custom permission that only allows user who sent or received the message
    to view or edit.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.sent_by == request.user or obj.sent_to == request.user

class IsReceiver(permissions.BasePermission):
    """
    Custom permission that only allows user who received the message
    to update view.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.sent_to == request.user
