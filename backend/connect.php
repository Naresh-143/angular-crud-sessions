<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

define('DB_HOST', "localhost:3307");
define('DB_USER', "root");
define('DB_PWD', "");
define('DB_DBNAME', "test");
function connect(){
    $connect = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_DBNAME);
    if(mysqli_connect_errno($connect)){
        die("Failed to connect:". mysqli_connect_error());
    }
    mysqli_set_charset($connect, 'utf8');
    return $connect;
}
$conn = connect();
?>