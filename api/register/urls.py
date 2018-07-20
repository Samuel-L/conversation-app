from rest_framework import routers

from register.views import RegisterViewSet, ProfileViewSet

router = routers.SimpleRouter()
router.register(r'register', RegisterViewSet, 'register')

profile_router = routers.SimpleRouter()
router.register(r'profiles', ProfileViewSet, 'profiles')
