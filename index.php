<?php

// require_once 'connection.php';
// phpinfo();

$host = '127.0.0.1';
$database = 'coffeeInHobby';
$user = 'root';
$password = 'dZAomy5i8V';

$link =mysqli_connect($host, $user, $password, $database) or die("error :(" . mysqli_error($link));

$query = "SELECT * FROM product";
$result = mysqli_query($link, $query) or die("error" . mysqli_error($link));

if ($result) {
    # code...
    print_r($result);
}

mysqli_close($link);
?>