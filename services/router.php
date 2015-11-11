<?php  
	require "../vendor/autoload.php";
	use Mailgun\Mailgun;
	
	$route = $_POST["route"];

	switch($route) {
		case "/message-contact": 

			$name = $_POST["name"];
			$message = $_POST["message"];
			$email = $_POST["email"];
			$mg = new Mailgun("key-965b394996e9633c0bacd9d5a9d6f47d");
			$domain = "sandbox735f530aa31d40e9b346877f11a9b08c.mailgun.org";
			$message_send = "De: ".$name.".  Mensaje: ".$message.".  Email: ".$email;
			try {
				$mg->sendMessage($domain, 
					array('from' 		=> 		'mailgun@sandbox735f530aa31d40e9b346877f11a9b08c.mailgun.org',
						  'to'			=>		'alfonso-13@live.com',
						  'subject'		=>		'Mensaje Contacto',
						  'text'		=>		$message_send
						)
				);
				http_response_code(200);
				echo json_encode(array("status" => "ok"));
			} catch (Exception $e) {
				http_response_code(500);
				echo json_encode(array("status" => "fail", "message" => $e));
			}
			break;
		case "/cotizacion":

			$name = $_POST["name"];
			$message = $_POST["message"];
			$email = $_POST["email"];
			$company = $_POST["company"];
			$site = $_POST["site"];
			$service = $_POST["service"];
			
			$mg = new Mailgun("key-965b394996e9633c0bacd9d5a9d6f47d");
			$domain = "sandbox735f530aa31d40e9b346877f11a9b08c.mailgun.org";
			//$message_send = "De: ".$name.".  Email: ".$email.".  Empresa: ".$company.".  Sitio web: ".$site.".  Mensaje: ".$message."  Servicio: ".$service;
			$html = "<div style='background: #4DB6AC;padding: 1em;color: white;'><p>Servicio: ".$service."</p><br /><h1 style='color: #fff;'>Nombre: ".$name."</h1><h2>Email: ".$email."</h2><h3>Empresa: ".$company."</h3><h3>Sitio Web: ".$site."</h3><div><h3>Mensaje: </h3><p>".$message."</p></div></div>";

			try {
				$mg->sendMessage($domain, 
					array('from' 		=> 		'mailgun@sandbox735f530aa31d40e9b346877f11a9b08c.mailgun.org',
						  'to'			=>		'alfonso-13@live.com',
						  'subject'		=>		'Mensaje Contacto',
						  'html'		=> 		$html
					));
				http_response_code(200);
				echo json_encode(array("status" => "ok"));
			} catch(Exception $e) {
				http_response_code(500);
				echo json_encode(array("status" => "fail", "message" => $e));
			}
	}
	
?>