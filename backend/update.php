<?php 
include 'connect.php';
//$homepage = file_get_contents('php://input');
//$input = json_decode($homepage, true);
$upload_dir = 'uploads/';
if(isset($_POST)){
    $sid   = $_POST['sid'];
    $fname = $_POST['first_name'];
    $lname = $_POST['last_name'];
    $email = $_POST['email'];
    
    if(isset($_FILES['avathar']) && $_FILES['avathar']!= ""){
        $avatar_name = $_FILES["avathar"]["name"];
        $avatar_tmp_name = $_FILES["avathar"]["tmp_name"];
        $random_name = rand(1000,1000000)."-".$avatar_name;
        $upload_name = $upload_dir.strtolower($random_name);
        $upload_name = preg_replace('/\s+/', '-', $upload_name);
        move_uploaded_file($avatar_tmp_name , $upload_name);
    }else{
        $upload_name = NULL;
    }
    
    $uqry = "UPDATE students SET first_name = '{$fname}', last_name = '{$lname}', email = '{$email}' WHERE id = '{$sid}'";
    if(mysqli_query($conn, $uqry)){
        if($upload_name){
            $uqry = "UPDATE students SET avathar = '{$upload_name}' WHERE id ='{$sid}'";
            mysqli_query($conn, $uqry);
        }
        echo http_response_code(201);
    }else{
        echo http_response_code(422);
    }
}
?>