<?php 

try {
    $dsn = "mysql:host=localhost;port=3306;dbname=pos;charset=utf8";
	$user = "root";
	$password = "root";
	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);    
	$pdo = new PDO( $dsn, $user, $password, $options); 

	$sql = "SELECT CUSTOMER.CUS_LAST, CUSTOMER.CUS_FIRST, CUSTOMER.CUS_GEN, CUSTOMER.CUS_PHONE, CUSTOMER.CUS_BIRTH, CUSTOMER.CUS_EMAIL FROM CUSTOMER;";
    
    $memInfo = $pdo->query($sql);
   
    $memInfo_json = array();
    while($row = $resInfo -> fetch(PDO::FETCH_ASSOC)){
        $resInfo_json[] = $row;
    }

    echo json_encode($memInfo_json, JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
	// echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";	
}
?>