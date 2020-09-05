<?php 
include 'connect.php';
if($_GET['id']){
    $sqry = mysqli_query($conn, "DELETE FROM students WHERE id= {$_GET['id']}");
    if($sqry){
//        $sqry = mysqli_query($conn, "SELECT * FROM students");
//       echo  $cnt = mysqli_num_rows($sqry);
        http_response_code(201);
    }else{
       http_response_code(404);
    }
}else{
    http_response_code(404);
}
?>