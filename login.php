<?php
	/* This is the password */
	$pass = 'deathtowebreg';

	if (isset($_POST['password'])) {
		if ($_POST['password'] == $pass) {
			// Set a cookie
			//setcookie('password', md5($pass), time()+60*60*24*365, '/', 'scheduwolf.com');
			setcookie('password', md5($pass), time()+60*60*24*365, '/', '');

			// Redirect
			header('Location: index.php');
		} else {
			header('Location: incorrect.html');
		}
	} else {
		echo "You must supply a password.";
	}
?>