from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token

from utils.router import DefaultRouter
from register.urls import router as register_router

router = DefaultRouter()
router.extend(register_router)

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api/obtain-token/', obtain_jwt_token),
]
