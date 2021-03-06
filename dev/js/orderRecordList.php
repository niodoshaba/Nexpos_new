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
    require_once("generalConnectDB.php");
   
    
    
    $sql = "SELECT ORDER_LIST.ORDER_NO, ORDER_LIST.ORDER_INNOUT, ORDER_LIST.ORDER_DATE, ORDER_LIST.ORDER_TTL_PRICE,
                   ORDER_ITEM.ORD_PRO_ITEM_NUM,
                   PRODUCT_ITEM.PRO_ITEM_NAME
            FROM   ORDER_LIST LEFT JOIN ORDER_ITEM
            ON	   ORDER_LIST.ORDER_NO = ORDER_ITEM.ORDER_NO 
            LEFT JOIN   PRODUCT_ITEM
            ON     ORDER_ITEM.PRO_ITEM_NO = PRODUCT_ITEM.PRO_ITEM_NO
            WHERE  ORDER_LIST.ORDER_NO = :ClickTrNo ;";      
             
    $orderRecordList = $pdo->prepare($sql);
    $orderRecordList->bindValue(":ClickTrNo", $_POST["ClickTrNo"]);
    $orderRecordList->execute();


    $orderRecordListData = array();
    while($row = $orderRecordList->fetch(PDO::FETCH_ASSOC)){
    $orderRecordListData[] = $row;
    }

    echo json_encode($orderRecordListData);

} catch (PDOException $e) {
	// echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";	
}
?>