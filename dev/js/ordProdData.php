<?php 
try {
	$dsn = "mysql:host=pixiangwens-MacBook-Pro.local;port=3306;dbname=G4_nexpos;charset=utf8";
	$user = "root";
	$password = "6316444939";
	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
	$pdo = new PDO( $dsn, $user, $password, $options); 

	$sql = "select * from `PRODUCT_ITEM`";
	$ordProd = $pdo->query($sql);


    $ordProdInfo = array();
    while($row = $ordProd->fetch(PDO::FETCH_ASSOC)){
        $ordProdInfo[] = $row;
    }

    echo json_encode($ordProdInfo);
	
} catch (PDOException $e) {
	// echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";	
}
?>