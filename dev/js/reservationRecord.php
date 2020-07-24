<?php 

try {
    require_once("generalConnectDB.php");

	$sql = " SELECT customer.CUS_LAST,customer.CUS_FIRST,customer.CUS_GEN,customer.CUS_PHONE,reservation.RES_DATE,reservation.RES_NUM,reservation.RES_NOTE
			 FROM customer,reservation
             WHERE customer.CUS_PHONE = reservation.CUS_PHONE
			 ORDER BY reservation.RES_DATE DESC
		  ;";
             
	$resInfo = $pdo->query($sql);


    $resInfo_json = array();
    while($row = $resInfo->fetch(PDO::FETCH_ASSOC)){
        $resInfo_json[] = $row;
    }

    echo json_encode($resInfo_json,JSON_UNESCAPED_UNICODE);
	
} catch (PDOException $e) {
	// echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";	
}
?>
