from django.conf.urls import url, include

from utils.router import DefaultRouter
from register.urls import router as register_router

router = DefaultRouter()
router.extend(register_router)

urlpatterns = [
    url(r'^api/', include(router.urls)),
]
