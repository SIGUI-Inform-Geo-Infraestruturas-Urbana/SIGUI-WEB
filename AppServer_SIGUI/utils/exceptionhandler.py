
from rest_framework.views import exception_handler
from http import HTTPStatus
from typing import Any, Dict

from rest_framework.views import Response



def custom_handler_exception(exc: Exception, context: Dict[str, Any]) -> Response:
    """Custom API exception handler."""

    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    if response is not None:
        # Using the description's of the HTTPStatus class as error message.
        http_code_to_message = {v.value: v.description for v in HTTPStatus}

        error_payload = {
            "error": {
                "status_code": 0,
                "message": "",
                "details": [],
            }
        }
        error = error_payload["error"]
        status_code = response.status_code

        error["status_code"] = status_code
        error["message"] = http_code_to_message[status_code]
        error["details"] = response.data
        response.data = error_payload
    return response

# def custom_handler_exception(exc,context):
#     handlers={
#         'ValidationError':_handle_generic_error,
#         'Http404':_handle_generic_error,
#         'PermissionDenied':_handle_generic_error,
#         'NotAuthenticated':_handle_authentication_error
#     }

#     response = exception_handler(exc,context)
#     print('response')
#     print(response)
#     if response is not None:
#         # response.data={
#         # 'error': 'Please login ro procced'
#         # }
#        response.data['status_code'] = response.status_code

#     exception_class = exc.__class__.__name__
#     print(exception_class)
#     if exception_class in handlers:
#         return handlers[exception_class](exc,context,response)
#     return response

# def _handle_authentication_error(exec,context,response):
#     response.data={
#         'error': 'Please login ro procced'
#     }
#     return response 

# def _handle_generic_error(exec,context,response):
#     print(response)
#     response.data = {"code" : 4026, "message": "test"}
#     return response 