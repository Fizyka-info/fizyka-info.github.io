<?php

$hostname = "us-cdbr-east-04.cleardb.com ";
$username = "be392d3481f8c6";
$password = "37efc915";
$db = "heroku_576e0dbd383ebc6";

$dbconnect=mysqli_connect($hostname,$username,$password,$db);

if($dbconnect->connect_error) {
    die("Database connection failed: " . $dbconnect->connect_error);
}

if(isset($_POST)) {
    $name=$_POST['name'];
    $email=$_POST['email'];
    $message=$_POST['message'];

    $query = "INSERT INTO `form_submission` (`name`, `email`, `message`) VALUES ('{$name}', '{$email}', '{$message}')";

    if (!mysqli_query($dbconnect, $query)) {
        die('An error occured.');
    } else {
        echo "Thank You! Message received";
    }
}

?>