Jack.Action = (function() {
    var routes = [];
    var actionFactory = function(route, callback) {
        routes.push({
            route: route,
            action: callback
        });
    };

    actionFactory.route = function(request, params) {
        var callback = Jack.Utils.detect(routes, function(i, action) {
            return action.route.test(request);
        });
        
        return !callback ? Jack.not_found() : [
            200,  Jack.default_headers , callback.action.call({},params)
        ];
    }
    return actionFactory;
})();
