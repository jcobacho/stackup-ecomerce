from ninja_extra.permissions import BasePermission
from django.http import HttpRequest

class IsSeller(BasePermission):
    """
    Allows access only to authenticated users.
    """

    def has_permission(
        self, request: HttpRequest, controller: "ControllerBase"
    ) -> bool:
        user = request.user or request.auth  # type: ignore
        return bool(user and user.is_seller)

class IsShopper(BasePermission):
    """
    Allows access only to authenticated users.
    """

    def has_permission(
        self, request: HttpRequest, controller: "ControllerBase"
    ) -> bool:
        user = request.user or request.auth  # type: ignore
        return bool(user and user.is_shopper)