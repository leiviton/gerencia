<!doctype html>
<html>
	<head>
		<base href="./">
		<meta charset="utf-8">
		<meta http-equiv="cache-control" content="no-cache" />
		<meta name="theme-color" content="#067e1a">
		<link rel="manifest" href="/manifest.json">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="description" content="Sistema de gerenciamento de restaurantes">
		<meta name="author" content="Leiviton Carlos">
		<meta name="keyword" content="Restaurantes,Pedidos,Food,Comida">
		<link rel="shortcut icon" href="{{ URL::asset('assets/img/favicon.png')}}">

		<title>Gerencia | Pedidos</title>

		<!-- Icons -->
		<link href="{{ URL::asset('assets/css/font-awesome.min.css')}}" rel="stylesheet">
		<link href="{{ URL::asset('assets/css/simple-line-icons.css')}}" rel="stylesheet">
		<link href="{{ URL::asset('assets/css/login.css')}}" rel="stylesheet">
		<link href="{{ URL::asset('styles.71df694076694930c462.bundle.css')}}" rel="stylesheet"/>
	</head>
	<body class="app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden">
		<!-- Enable bootstrap 4 theme -->
		<script>window.__theme = 'bs4';</script>
		<!-- App Loading... -->
		<script type="text/javascript" src="{{ URL::asset('inline.f6a28a06f61fde51b518.bundle.js')}}"></script>
		<script type="text/javascript" src="{{ URL::asset('polyfills.2b54cbaf017d7cde20d9.bundle.js')}}"></script>
		<script type="text/javascript" src="{{ URL::asset('scripts.21437ba4ab9367dc01b6.bundle.js')}}"></script>
		<script type="text/javascript" src="{{ URL::asset('vendor.8ba30b4c172d592265a5.bundle.js')}}"></script>
		<script type="text/javascript" src="{{ URL::asset('main.53ae06f532119d242a18.bundle.js')}}"></script>

		<script type="text/javascript">(function () {
        var options = {
            whatsapp: "+5535988755376", // WhatsApp number
            email: "leivitonpj@gmail.com", // Email
            company_logo_url: "//static.whatshelp.io/img/flag.png", // URL of company logo (png, jpg, gif)
            greeting_message: "Entre em contato com o suporte e deixe uma mensagem.", // Text of greeting message
            call_to_action: "Suporte online", // Call to action
            button_color: "#129BF4", // Color of button
            position: "right", // Position may be 'right' or 'left'
            order: "whatsapp,email" // Order of buttons
        };
        var proto = document.location.protocol, host = "whatshelp.io", url = proto + "//static." + host;
        var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = url + '/widget-send-button/js/init.js';
        s.onload = function () { WhWidgetSendButton.init(host, proto, options); };
        var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
    })();</script>
	</body>
</html>
