# logzio-js
A client side logger for web applications

## Usage

Add this snippet just before your closing `</body>` tag.
```javascript
<script type="text/javascript">
    (function() {
        var d = parseInt(new Date().getTime()) / 1000 / 60 / 30;
        var l = document.createElement("script"); l.type = "text/javascript"; l.async = true;
        l.src = "//cdn.logz.io/logger.min.js";
        document.getElementsByTagName("head")[0].appendChild(l);
    })();
    LogzioLogger('__YOUR_API_KEY__');
</script>
```

And now you can report logs anywhere you like, like this :
```javascript
<script type="text/javascript">
    // you can send a string message like this
    LogzioLogger.log('This is a log message for logzio');
    
    // or send an object to log, like this
    LogzioLogger.log({
        param1: 'value1',
        param2: 'value2',
        message: 'There was an error I want to log'
    });
</script>
```
