(function(window, document) {

    var LogzioLogger = function(apiKey, sendConsoleErrors) {
        this.key = apiKey;
        if (sendConsoleErrors) sendConsoleErrors();
    };

	var sendConsoleErrors = function() {
		var _onerror = window.onerror;
		window.onerror = function (msg, url, line, col) {
		    logzioLogger.log({
                message: msg,
                url: url,
                line: line,
                col: col
            });
		};
	};
    
    LogzioLogger.prototype.log = function(data) {    
        try {
            var parsedMsg = typeof data == 'object' ? data : { message:data };
            var logUrl = window.location.protocol + '//listener-http.logz.io:5060?token=' + this.key;

            Object.keys(parsedMsg).forEach(function(key) {
                logUrl += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(parsedMsg[key]);
            });

            var logImg = new Image();
            logImg.src = logUrl;
        } catch (ex) {
            if (window && window.console && typeof window.console.log == 'function') {
                console.log("Failed to send log because of exception:\n" + ex);
            }
        }
    }
    
    window.LogzioLogger = LogzioLogger;
    
})(window, document);