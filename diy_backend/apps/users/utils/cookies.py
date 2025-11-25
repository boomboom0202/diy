def set_auth_cookies(response, access, refresh):
    response.set_cookie(
        "access",
        access,
        httponly=True,
        secure=True,
        samesite="Lax",
        max_age=15 * 60,
    )
    response.set_cookie(
        "refresh",
        refresh,
        httponly=True,
        secure=True,
        samesite="Lax",
        max_age=7 * 24 * 60 * 60,
    )
    return response


def set_csrf_cookie(response, request):
    from django.middleware.csrf import get_token
    response.set_cookie(
        "csrftoken",
        get_token(request),
        httponly=False,
        samesite="Lax",
    )
    return response


def clear_auth_cookies(response):
    for cookie in ("access", "refresh", "csrftoken"):
        response.delete_cookie(cookie)
    return response
