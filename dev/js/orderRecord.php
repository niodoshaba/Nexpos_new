<?php 

try {
    require_once("generalConnectDB.php");
   

    
    
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