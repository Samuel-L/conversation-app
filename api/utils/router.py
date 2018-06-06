from rest_framework import routers

class DefaultRouter(routers.DefaultRouter):
    """
    Extends 'DefaultRouter' class to add a method for extending url routes from
    another router.
    """
    def extend(self, router):
        """
        Extend the routes with url routes to the passed in router.
        Args:
            router: A SimpleRouter instance containing route definisions
        """
        self.registry.extend(router.registry)

