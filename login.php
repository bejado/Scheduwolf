<?php
	/* This is the password */
	$pass = 'deathtowebreg';
	$pass2 = 'crashcourse';

	if (isset($_POST['password'])) {
		if ($_POST['password'] == $pass || 
			$_POST['password'] == $pass2) {
			// Set a cookie
			//setcookie('password', md5($pass), time()+60*60*24*365, '/', 'scheduwolf.com');
			setcookie('password', md5($pass2), time()+60*60*24*365, '/', '');

			// Redirect
			header('Location: index.php');
		} else {
			header('Location: incorrect.html');
		}
	} else {
		echo "You must supply a password.";
	}
?>