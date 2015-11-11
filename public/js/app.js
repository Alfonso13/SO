function init() {
	document.formulario_contacto.addEventListener('invalid', function invalid(target) {
		var elemento = target.target;
		if(elemento.tagName.toLowerCase() != "fieldset") {
			$(elemento).css({
				borderBottom: "2px solid #EF5350"
			})
			$(elemento).siblings("span").addClass("field-error");
		}
	}, true);
	document.formulario_contacto.addEventListener('input', function inputForm(element) {
		var target = $(element.target);
		var siblings = target.siblings("span");
		if(siblings.hasClass("field-error")) {
			target.css({borderBottom: "none"})
			siblings.removeClass("field-error");
		}
	},false);
	$("#btn_enviar").on('click', function sendForm(event) {
		event.preventDefault();
		var valido = document.formulario_contacto.checkValidity();
		if(valido) {
			var name = $("#contact-name").val();
			var email = $("#contact-email").val();
			var message =$("#contact-message").val();

			var data = {
				name: name,
				email: email,
				message: message,
				route: '/message-contact'
			};
			var xhr = $.post("services/router.php", data);
			xhr.done(function (response, message, http) {
				if(http.status == 200) { 
					document.getElementById("form-contact-team").reset();
					alert("¡Mensaje Enviado! :)")	
				}
				else {
					alert("Intenta nuevamente :/");
				}
			});
		}
	});
	$("button.cotizar").on({
		click: function click(event) {
			event.preventDefault();
			$('body')
					.css({
						overflow: 'hidden'
					});

			$("#ModalCotizacion")
				.removeClass('no-visibility')
				.addClass('visibility');
			$("#container-form-service input").css({
				border: '1px solid #E2E2E2' 
			});
		}
	});
	$("section.modal .close").on({
		click: function click() {
			$(this).parent().parent().removeClass('visibility').addClass('no-visibility');
			$('body').css({overflow: 'auto'});
			$("section.modal #container-form-service span").removeClass('field-error');
		}
	});
	$("#btn-cotizar").on({
		click: function click(event) {
			event.preventDefault();
			var valido = document.formulario_cotizacion.checkValidity();
			if(valido) {
				var nombre = $("#cotizacion_nombre").val();
				var correo = $("#cotizacion_correo").val();
				var empresa = $("#cotizacion_empresa").val();
				var mensaje = $("#cotizacion_mensaje").val();
				var site = $("#cotizacion_sitio").val();
				var data = {
					name: nombre,
					email: correo,
					company: empresa,
					message: mensaje,
					site: site,
					route: '/cotizacion'
				};

				var xhr = $.post("services/router.php", data);
				xhr.done(function (response, message, http_response) {
					if(http_response.status == 200) {
						document.formulario_cotizacion.reset();
						$("#ModalCotizacion").removeClass('visibility').addClass('no-visibility');
						$('body')
							.css({
								overflow: 'auto'
							});
						alert("Enviado");
					}
					else {
						alert("No Enviado");
					}
				});
			}
		}
	});
	$("#btn_ser-parte").on({
		click: function click(event) {
			event.preventDefault();
			var servicesTop = $("#container-services").offset().top;
			var width = $(document).width();
			$("html, body").stop().animate({scrollTop: servicesTop-60}, "900", "swing");
		}
	});
	var previousScroll = 0;
	var headerHeight = $("#header").height();
	var headerOrgOffset = $("#layout-header").offset().top;

	var a = 0;
	$("#navigation a").on('click', function navigation(element) {
		if(element.target.getAttribute('data-role')) {
			element.preventDefault();
			var role = element.target.getAttribute('data-role');
			if(role) {
				var hash = element.target.getAttribute('data-hash');
				var client = $("#"+role).offset();

				$("html, body").stop().animate({scrollTop: client.top-60}, "1500", "swing");
				window.location.hash = hash;
			}
		}
	});
	$("#formulario_cotizacion_paquete button").on('click', function click(event) {
		event.preventDefault();
		var valido = document.formulario_cotizacion_paquete.checkValidity();
		if(valido) {
			var serializeObject = $("#formulario_cotizacion_paquete").serializeObject();
			serializeObject.route = '/cotizacion';
			var services = [];
			$("#selection-services a.selectedService").each(function each(index, service) {
				services.push($(service).attr('data-service-id'));
			});
			serializeObject.service = services.join(", ");
			var xhr = $.post('services/router.php', serializeObject);
			xhr
			.done(function done(r,m,http) {
				if(http.status == 200) {
					alert("Enviado");
				}
				else {
					alert("No enviado");
				}
			})
			.error(function error() {
				alert("No enviado");
			});
		}
	});

	document.formulario_cotizacion.addEventListener('invalid', function (element) {
		var elemento = element.target;
		if(elemento.tagName.toLowerCase() != 'fieldset') {
			$(elemento).css({
				borderBottom: '2px solid #EF5350'
			});
			$(elemento).siblings("span").addClass("field-error");
		}
	}, true);


	document.formulario_cotizacion.addEventListener('input', function input(element) {
		var target = $(element.target);
		var siblings = target.siblings("span");
		if(siblings.hasClass("field-error")) {
			target.css({borderBottom: "none"})
			siblings.removeClass("field-error");
		}
	}, false);

};

$(document).on('ready', init);