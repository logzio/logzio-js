(function(window) {

    var LogzioLogger = function(apiKey, sendConsoleJsErrors) {
        this.key = apiKey;
        if (sendConsoleJsErrors) sendConsoleErrors();
    };

	var sendConsoleErrors = function() {
		window.onerror = function (msg, url, line, col) {
		    LogzioLogger.log({
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
            var logUrl = window.location.protocol + '//listener.logz.io:';
            logUrl += (window.location.protocol === 'http:' ? '8090' : '8091') + '?token=' + this.key;

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
    
})(window);
