<?php 
include 'connect.php';
$data = [];
$students = [];
$limit = 5;
$page  = ($_GET['page']) ? $_GET['page'] : 0;
if($page > 0){
    $limitsql = ' Limit ' . ($page - 1) * $limit . ', ' . $limit;
}else{
    $limitsql = ' Limit 0,5';
}
$sqryc = mysqli_query($conn, "SELECT * FROM students");
$sqryc_nr = mysqli_num_rows($sqryc);
$data['totalCount'] = $sqryc_nr;

$sqry = mysqli_query($conn, "SELECT * FROM students ORDER By id DESC " .$limitsql);
if(mysqli_num_rows($sqry) >0 ){
    $cr = 0;
    while($row = mysqli_fetch_assoc($sqry)){
        $data['students'][$cr]['sid'] = $row['id'];
        $data['students'][$cr]['first_name'] = $row['first_name'];
        $data['students'][$cr]['last_name']  = $row['last_name'];
        $data['students'][$cr]['email']      = $row['email'];
        $data['students'][$cr]['avathar']    = 'http://api.angularphp.com/'.$row['avathar'];
        $cr++;
    }
    echo json_encode($data);
}else{
    http_response_code(404);
}
?>