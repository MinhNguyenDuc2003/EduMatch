<!DOCTYPE html>
<html>
<head>
    <title>Logging out...</title>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow" />
    <style>
        body { display: none; }
    </style>
</head>
<body>
    <form id="kc-logout-form" action="${url.logout}" method="post">
        <input type="hidden" name="logout" value="true"/>
        <noscript>
            <style>body { display: block; padding-top: 50px; text-align: center; font-family: sans-serif; }</style>
            <input type="submit" value="Click here to logout" />
        </noscript>
    </form>
    <script>
        document.getElementById("kc-logout-form").submit();
    </script>
</body>
</html>
