<?php
include 'connect.php';
//$homepage = file_get_contents('php://input');
//$input = json_decode($homepage, true);
$upload_dir = 'uploads/';
if(isset($_POST)){
    $fname = $_POST['first_name'];
    $lname = $_POST['last_name'];
    $email = $_POST['email'];
    $pwd   = base64_encode($_POST['password']);
    
    if($_FILES['avathar']){
        $avatar_name = $_FILES["avathar"]["name"];
        $avatar_tmp_name = $_FILES["avathar"]["tmp_name"];
        $random_name = rand(1000,1000000)."-".$avatar_name;
        $upload_name = $upload_dir.strtolower($random_name);
        $upload_name = preg_replace('/\s+/', '-', $upload_name);
        move_uploaded_file($avatar_tmp_name , $upload_name);
    }else{
        $upload_name = NULL;
    }
    
    $iqry = "INSERT INTO students(first_name,last_name,email,pwd, user_type) VALUES('{$fname}', '{$lname}', '{$email}', '{$pwd}', '1')";
    if(mysqli_query($conn, $iqry)){
        $user_id = $conn->insert_id;
        if($upload_name){
            $uqry = "UPDATE students SET avathar = '{$upload_name}' WHERE id ='{$user_id}'";
            mysqli_query($conn, $uqry);
        }
        echo http_response_code(201);
    }else{
        echo http_response_code(422);
    }
}
?>