#!/usr/bin/env jack

var hello = function() {
    return "<h1>O hai</h1>";
};

var error = function() {
    return "11".boom();
}

Jack.Action(/o-hai/, hello);
Jack.Action(/pow/, error);

Jack.Action(/jquery/,function() {
    window.document = new DOMDocument( baconl("%div.message") );
    window.$(".message").text("Hello from jquery");
    return window.document.innerHTML;
});

Jack.up()