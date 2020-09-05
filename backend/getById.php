<?php 
include 'connect.php';
if($_GET['id']){
    $sqry = mysqli_query($conn, "SELECT * FROM students WHERE id = {$_GET['id']}");
    if(mysqli_num_rows($sqry) >0 ){
        $student = mysqli_fetch_assoc($sqry);
        echo json_encode($student);
    }else{
        http_response_code(404);
    }
}
?>