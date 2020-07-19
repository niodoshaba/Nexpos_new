<?php 

try {
    $dsn = "mysql:host=localhost;port=3306;dbname=pos;charset=utf8";
	$user = "root";
	$password = "root";
	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);    
    $pdo = new PDO( $dsn, $user, $password, $options); 
    // $servername = "localhost:3306";
	// $username = "root";
	// $password = "root";
	// $db="pos";
	// $conn = mysqli_connect($servername, $username, $password,$db);

    $CUS_FIRST = $_POST["CUS_FIRST"];
    $CUS_LAST = $_POST["CUS_LAST"];
    $CUS_GEN = $_POST["CUS_GEN"];
    $CUS_PHONE = $_POST["CUS_PHONE"];
    $CUS_BIRTH = $_POST["CUS_BIRTH"];
    $CUS_EMAIL = $_POST["CUS_EMAIL"];

    //insert member info to database
	$sql = "INSERT into CUSTOMER value ('$CUS_PHONE', '$CUS_LAST', '$CUS_FIRST',  '$CUS_GEN', '$CUS_BIRTH', '$CUS_EMAIL')";
	$memInfo = $pdo->prepare ($sql);
    $memInfo->execute();

    // echo 
    // "<script> alert('送出成功');
    // location.href='../../dest/memberJoin.html';
    // </script>";

} catch (PDOException $e) {
	// echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";	
}
?>