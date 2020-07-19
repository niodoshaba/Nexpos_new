<?php 

// ORDER_LIST
// ORDER_NO(PK), ORDER_INNOUT, ORDER_DATE

// ORDER_ITEM
// ORD_SERIAL_NO(PK), PRO_ITEM_NO(FK), ORD_PRO_ITEM_NUM, ORDER_NO(FK), 

// ORDER_ITEM_DES
// FILLING_ITEM_NO(PK,FK), ORD_SERIAL_NO(PK,FK)

// PRODUCT_ITEM
// PRO_ITEM_NO(PK), PRO_ITEM_NAME

// FILLING_ITEM
// FILLING_ITEM_NO(PK), FILLING_ITEM_NAME



try {
    $dsn = "mysql:host=localhost;port=3306;dbname=g4_nexpos;charset=utf8";
	$user = "root";
	$password = "95123654";
	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);    
	$pdo = new PDO( $dsn, $user, $password, $options); 

    
    
    $sql = " SELECT ORDER_DATE, ORDER_NO, ORDER_NUM, ORDER_TTL_PRICE
             FROM ORDER_LIST
             WHERE ORDER_DATE  BETWEEN :anaStart AND :anaEnd
             ORDER BY ORDER_DATE DESC
          ;";      
             
    $orderRecord = $pdo->prepare($sql);
    $orderRecord->bindValue(":anaStart", $_POST["anaStart"]);
    $orderRecord->bindValue(":anaEnd", $_POST["anaEnd"]);
    $orderRecord->execute();


    $orderRecordData = array();
    while($row = $orderRecord->fetch(PDO::FETCH_ASSOC)){
    $orderRecordData[] = $row;
    }

    echo json_encode($orderRecordData);

} catch (PDOException $e) {
	// echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";	
}
?>