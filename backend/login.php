<?php 
include 'connect.php';
$response = [];
$usernme = ($_POST['username']) ? $_POST['username'] : '';
$pwd     = ($_POST['password']) ? $_POST['password'] : '';

$sqry = mysqli_query($conn, "SELECT * FROM students WHERE email = '".$usernme."' AND pwd = '". base64_encode($pwd)."' ");
if(mysqli_num_rows($sqry) >0 ){
    $student = mysqli_fetch_assoc($sqry);
    $response['message'] = "OK";
    $response['data'] = $student;
    $response['status'] = true;
    echo json_encode($response);
}else{
   $response['message'] = "Invalid Username or Password";
    $response['status'] = false;
    echo json_encode($response);
}
?>