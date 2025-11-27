<form id="kc-logout-form" action="${url.logout}" method="post">
    <input type="hidden" name="logout" value="true"/>
</form>

<script>
    document.getElementById("kc-logout-form").submit();
</script>
