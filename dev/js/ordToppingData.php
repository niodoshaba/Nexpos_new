<?php 
try {
	// require_once("ordCon.php");
	require_once("ordCon.php");
    

	$sql = "SELECT FILLING_CATA.FILLING_CATA_NO,FILLING_CATA.FILLING_CATA_NAME, FILLING_CATA.FILLING_CATA_ONOFF, 
	FILLING_ITEM.FILLING_CATA_NO, FILLING_ITEM.FILLING_ITEM_NO, FILLING_ITEM.FILLING_ITEM_NAME, FILLING_ITEM.FILLING_ITEM_PRICE, FILLING_ITEM.FILLING_ITEM_ONOFF
	FROM FILLING_CATA JOIN FILLING_ITEM
	ON FILLING_CATA.FILLING_CATA_NO = FILLING_ITEM.FILLING_CATA_NO
	WHERE FILLING_ITEM.FILLING_ITEM_ONOFF = 1;";
	$ordTopping = $pdo->query($sql);


    $ordToppingInfo = array();
    while($row = $ordTopping->fetch(PDO::FETCH_ASSOC)){
        $ordToppingInfo[] = $row;
    }

    echo json_encode($ordToppingInfo);
	
} catch (PDOException $e) {
	// echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";	
}
?>