Johnson.require("johnson/browser");
Johnson.require("johnson/browser/jquery");

var Jack = {
  version: Ruby.Jack.VERSION,
  default_headers: {'Content-Type': 'text/html'},
  
  up: function(){
    return function(env) {
        Ruby.Dir.glob("controllers/*.js").each(function(file) {
            eval(Ruby.File.read(file));
        });
        
        try {
            return Jack.Action.route(
                env["PATH_INFO"],
                Jack.Utils.parameterize(env['QUERY_STRING'])
            );
        }
        catch(e) {
            return Jack.application_error(e);
        }
    }
  },
  
  not_found: function () {
    return [404, Jack.default_headers, "<h1>Not Found</h1>"];
  },

  application_error: function (e) {
    Jack.log.error(e.name + ': ' + e.message);
    var html = ["<h1>Application Error: " + e.name + "</h1>",
      "<p>" + e.message + "</p>"].join("\n");
    return [500, Jack.default_headers, html];
  }
};

