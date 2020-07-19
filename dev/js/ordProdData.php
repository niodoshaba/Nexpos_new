<?php 
try {
	require_once("generalConnectDB.php");


    // 先看看日期內有沒有折扣活動
    $sql_dis = "SELECT DIS_NO, DIS_CATA_NO, DIS_PCTALL
    FROM DISCOUNT
    WHERE CURDATE() BETWEEN DIS_START AND DIS_END";
    
	$ordDisPeriod = $pdo->query($sql_dis);
    

    while($row = $ordDisPeriod->fetch(PDO::FETCH_ASSOC)){
        $DIS_CATA_NO = $row["DIS_CATA_NO"];
        $DIS_PCTALL = $row["DIS_PCTALL"];
        $DIS_NO = $row["DIS_NO"];
        // settype($DIS_PCTALL, "int");
    };

    // echo json_encode($DIS_CATA_NO);

    
    // echo $DIS_PCTALL;
    // 如果沒有資料，代表該時期沒有折扣
    if($ordDisPeriod->rowCount()!=0){
        // 先判斷折扣是全館：0還是期間:1
        if($DIS_CATA_NO == 0){
            $sql_allProd = "SELECT *, PRO_ITEM_PRICE AS 'before',
            ROUND(PRODUCT_ITEM.PRO_ITEM_PRICE*$DIS_PCTALL, 0) AS 'PRO_ITEM_PRICE'
            FROM PRODUCT_CATA JOIN PRODUCT_ITEM
            ON PRODUCT_CATA.PRO_CATA_NO = PRODUCT_ITEM.PRO_CATA_NO
            WHERE PRO_ITEM_ONOFF =1;";
    
            $ordProd = $pdo->query($sql_allProd);
            $ordProdInfo = array();   
            
            while($row = $ordProd->fetch(PDO::FETCH_ASSOC)){
                $ordProdInfo[] = $row;
            };
            
            echo json_encode($ordProdInfo);
    
        }elseif($DIS_CATA_NO == 1){
            $sql_partProd = "SELECT  DISCOUNT.DIS_NO, DISCOUNT.DIS_PCTALL, DIS_ITEM.PRO_ITEM_NUMBER, PRODUCT_CATA.PRO_CATA_NO, PRODUCT_CATA.PRO_CATA_ONOFF, PRODUCT_CATA.PRO_CATA_NAME, PRODUCT_ITEM.PRO_ITEM_NO, PRODUCT_ITEM.PRO_CATA_NO, PRODUCT_ITEM.PRO_ITEM_NAME,PRODUCT_ITEM.PRO_ITEM_ONOFF, PRODUCT_ITEM.PRO_ITEM_PRICE AS 'before',
            ifnull(ROUND(PRODUCT_ITEM.PRO_ITEM_PRICE*DISCOUNT.DIS_PCTALL, 0) , ROUND(PRODUCT_ITEM.PRO_ITEM_PRICE*1, 0)) AS 'PRO_ITEM_PRICE'
            FROM DISCOUNT  JOIN DIS_ITEM 
            ON DISCOUNT.DIS_NO = DIS_ITEM.DIS_NO
            right JOIN PRODUCT_ITEM
            ON PRO_ITEM_NUMBER = PRO_ITEM_NO
            AND DISCOUNT.DIS_NO = $DIS_NO
            JOIN PRODUCT_CATA
            ON PRODUCT_CATA.PRO_CATA_NO = PRODUCT_ITEM.PRO_CATA_NO
            WHERE PRO_ITEM_ONOFF = 1;";
    
            $ordProd = $pdo->query($sql_partProd);
            $ordProdInfo = array();   
            
            while($row = $ordProd->fetch(PDO::FETCH_ASSOC)){
            $ordProdInfo[] = $row;
            };

            echo json_encode($ordProdInfo);
    
        };
    }elseif($DIS_NO == null){
        //如果沒有折扣，則顯示原價
        $sql = "SELECT *
        FROM PRODUCT_CATA JOIN PRODUCT_ITEM
        ON PRODUCT_CATA.PRO_CATA_NO = PRODUCT_ITEM.PRO_CATA_NO
        WHERE PRO_ITEM_ONOFF =1;";
        $ordProd = $pdo->query($sql);

        $ordProdInfo = array();
        while($row = $ordProd->fetch(PDO::FETCH_ASSOC)){
            $ordProdInfo[] = $row;
        };
        
        echo json_encode($ordProdInfo);
    
    }
    

	
} catch (PDOException $e) {
	// echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";	
}
?>