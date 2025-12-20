<!DOCTYPE html>
<html>
<head>
    <title>Logging out...</title>
    <meta name="robots" content="noindex, nofollow" />
    <style>
        body { font-family: sans-serif; text-align: center; padding-top: 50px; }
    </style>
</head>
<body>
    <div id="message">Processing logout...</div>
    <form id="kc-logout-form" action="${url.logout}" method="post">
        <input type="hidden" name="logout" value="true"/>
        <noscript>
            <input type="submit" value="Click here to logout" />
        </noscript>
    </form>
    <script>
        window.onload = function() {
            document.getElementById("kc-logout-form").submit();
        };
    </script>
</body>
</html>
