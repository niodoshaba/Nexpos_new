<?php

try {
    /// require_once("generalConnectDB.php");
    require_once("ordCon.php");
    
    
    $ordTotOrder = json_decode($_POST["ordTotOrder"]);
   

    foreach ($ordTotOrder as $key => $value) {
        # code...

        $PRO_ITEM_NO = $value->PRO_ITEM_NO;
        settype($PRO_ITEM_NO, "int");
        // echo gettype($PRO_ITEM_NO);

        $PRO_ITEM_PRICE = $value->PRO_ITEM_PRICE;
        settype($PRO_ITEM_PRICE, "int");
        // echo gettype($PRO_ITEM_PRICE);



       
        // $bbb = $value->PRO_ITEM_NO;
        
        // echo json_encode($ORD_SERIAL_NO+1);
        // echo json_encode($PRO_ITEM_NO);
        // var_dump($PRO_ITEM_NO);
        // var_dump($PRO_ITEM_PRICE);

        // echo "123",  "<br>", $PRO_ITEM_NO,  "<br>";

        // die;

        
        $sql = "INSERT INTO `ORDER_ITEM` VALUES (NULL , 100001, $PRO_ITEM_NO, 1, $PRO_ITEM_PRICE)";
        

        $ordProdIntoDb = $pdo->prepare($sql);
        $ordProdIntoDb->execute();

       

    };
    

    // echo "<script> alert('成功？'); </script>";
    
    // echo json_encode($PRO_ITEM_PRICE);
    
	
} catch (PDOException $e) {
	// echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";	
}
?>
