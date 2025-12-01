from django.http import JsonResponse
from django.urls import resolve

class EmailVerificationMiddleware:
    """Требовать подтвержденный email для определенных эндпоинтов"""
    
    EXEMPT_URLS = [
        'login', 'register', 'verify-email', 
        'resend-verification', 'logout'
    ]

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            url_name = resolve(request.path_info).url_name
            
            if url_name not in self.EXEMPT_URLS:
                if not request.user.is_email_verified:
                    return JsonResponse({
                        'success': False,
                        'message': 'Подтвердите email для доступа к этому функционалу'
                    }, status=403)

        return self.get_response(request)

