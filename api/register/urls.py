from rest_framework import routers

from register.views import RegisterViewSet

router = routers.SimpleRouter()
router.register(r'register', RegisterViewSet, 'register')

