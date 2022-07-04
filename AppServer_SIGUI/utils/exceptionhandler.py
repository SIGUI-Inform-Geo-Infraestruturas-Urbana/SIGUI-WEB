
from rest_framework.views import exception_handler

def custom_handler_exception(exc,context):
    handlers={
        'ValidationError':_handle_generic_error,
        'Http404':_handle_generic_error,
        'PermissionDenied':_handle_generic_error,
        'NotAuthenticated':_handle_authentication_error
    }

    response = exception_handler(exc,context)
    print('response')
    print(response)
    if response is not None:
        # response.data={
        # 'error': 'Please login ro procced'
        # }
       response.data['status_code'] = response.status_code

    exception_class = exc.__class__.__name__
    print(exception_class)
    if exception_class in handlers:
        return handlers[exception_class](exc,context,response)
    return response

def _handle_authentication_error(exec,context,response):
    response.data={
        'error': 'Please login ro procced'
    }
    return response 

def _handle_generic_error(exec,context,response):
    print(response)
    response.data = {"code" : 4026, "message": "test"}
    return response 