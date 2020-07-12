<?php 
try {
	require_once("ordCon.php");

	// $sql = "select * from `PRODUCT_ITEM`";
	// $ordProd = $pdo->query($sql);


    // $ordProdInfo = array();
    // while($row = $ordProd->fetch(PDO::FETCH_ASSOC)){
    //     $ordProdInfo[] = $row;
    // }

	// echo json_encode($ordProdInfo);
	

	// 期間折扣商品
	// $sql_dis = "SELECT  DISCOUNT.DIS_NO, DISCOUNT.DIS_PCTALL, DIS_ITEM.PRO_ITEM_NUMBER, PRODUCT_ITEM.PRO_ITEM_NO
	// FROM DISCOUNT JOIN DIS_ITEM 
	// ON DISCOUNT.DIS_NO = DIS_ITEM.DIS_NO
	// JOIN PRODUCT_ITEM
	// ON PRO_ITEM_NUMBER = PRO_ITEM_NO;";

	// 把商品全部帶出來，不管有折扣或沒折扣
	$sql = "SELECT  DISCOUNT.DIS_NO, DISCOUNT.DIS_PCTALL, DIS_ITEM.PRO_ITEM_NUMBER, 
	PRODUCT_ITEM.PRO_ITEM_NO, PRODUCT_ITEM.PRO_CATA_NO, PRODUCT_ITEM.PRO_ITEM_NAME,PRODUCT_ITEM.PRO_ITEM_ONOFF, PRODUCT_ITEM.PRO_ITEM_PRICE AS 'before',
	ifnull(ROUND(PRODUCT_ITEM.PRO_ITEM_PRICE*DISCOUNT.DIS_PCTALL, 0) , ROUND(PRODUCT_ITEM.PRO_ITEM_PRICE*1, 0)) AS 'PRO_ITEM_PRICE'
	FROM DISCOUNT  JOIN DIS_ITEM 
	ON DISCOUNT.DIS_NO = DIS_ITEM.DIS_NO
	right JOIN PRODUCT_ITEM
	ON PRO_ITEM_NUMBER = PRO_ITEM_NO;";
	
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