def dev_cors_middleware(get_response):
    def middleware(request):
        response = get_response(request)
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response['Access-Control-Allow-Methods'] = 'GET, POST'
        #response['Access-Control-Allow-Origin'] = 'Content-Type, X-CSRFToken'
        #response['Access-Control-Allow-Origin'] = 'true'
        response['Access-Control-Allow-Headers'] = '*'
        response['Access-Control-Allow-Credentials'] = 'true'
        return response
    return middleware