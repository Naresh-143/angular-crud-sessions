<?php 
include 'connect.php';
if(isset($_POST)){
    if($_FILES['avathar']){
      echo   $avatar_name = $_FILES["avathar"]["name"];
      echo   $avatar_tmp_name = $_FILES["avathar"]["tmp_name"];
    }else{
       echo  $upload_name = NULL;
    }
}
?>