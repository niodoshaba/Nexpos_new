<?php 

try {
    // $dsn = "mysql:host=localhost;port=8889;dbname=G4_nexpos;charset=utf8";
	// $user = "root";
	// $password = "root";
	// $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);    
    // $pdo = new PDO( $dsn, $user, $password, $options); 
    

    // require_once("generalConnectDB.php");
    require_once("ordCon.php");

    $CUS_PHONE = $_POST["CUS_PHONE"];
    $CUS_ID = $_POST["CUS_ID"];
    $CUS_STATE = $_POST["CUS_STATE"];
    $CUS_LAST = $_POST["CUS_LAST"];
    $CUS_FIRST = $_POST["CUS_FIRST"];
    $CUS_GEN = $_POST["CUS_GEN"];
    $CUS_BIRTH = $_POST["CUS_BIRTH"];
    $CUS_EMAIL = $_POST["CUS_EMAIL"];
    $CUS_POINT = $_POST["CUS_POINT"];

    //insert member info to database
	$sql = "INSERT into CUSTOMER value ('$CUS_PHONE','$CUS_ID','$CUS_STATE','$CUS_LAST' ,'$CUS_FIRST', '$CUS_GEN', '$CUS_BIRTH', '$CUS_EMAIL', '$CUS_POINT')";
	$memInfo = $pdo->prepare ($sql);
    $memInfo->execute();

    echo 
    "<script> alert('送出成功');
    location.href='../memberJoin.html';
    </script>";

} catch (PDOException $e) {
	// echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";	
}
?>