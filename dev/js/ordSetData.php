<?php

    // $test = json_decode('[{"orderList":6,"inOrOut":"in","number":"e","ppl":0},
    // {"PRO_CATA_NO":"1","PRO_CATA_NAME":"三明治","PRO_CATA_ONOFF":"1","PRO_ITEM_NO":"2","PRO_ITEM_NAME":"燻雞","PRO_ITEM_PRICE":"45","PRO_ITEM_ONOFF":"1","PRO_PIC":null,"status":1,"state":0,"topping":[]},
    // {"PRO_CATA_NO":"1","PRO_CATA_NAME":"三明治","PRO_CATA_ONOFF":"1","PRO_ITEM_NO":"1","PRO_ITEM_NAME":"季節鮮蔬","PRO_ITEM_PRICE":"40","PRO_ITEM_ONOFF":"1","PRO_PIC":null,"status":1,"state":0,"topping":[]}]'); // 陣列包物件

    // unset($test[1]["topping"]); // 把topping刪掉
    // unset($test[2]["topping"]);


try {
  require_once("generalConnectDB.php");
  // echo $_POST["ordTotOrder"];
  $ordTotOrder = json_decode($_POST["ordTotOrder"]);


  $arrWithProd = [];

  for($g=1; $g<count($ordTotOrder);$g++){
  array_push($arrWithProd, $ordTotOrder[$g]);
}

  $orderList = $ordTotOrder[0]->orderList; 

  
echo "<hr>";

// {"PRO_CATA_NO":"1","PRO_CATA_NAME":"三明治","PRO_CATA_ONOFF":"1","PRO_ITEM_NO":"2","PRO_ITEM_NAME":"燻雞","PRO_ITEM_PRICE":"45","PRO_ITEM_ONOFF":"1","PRO_PIC":null,"status":1,"state":0,}

  foreach($arrWithProd as $key =>  $value){
    // echo "****".$value->PRO_ITEM_NAME."<br>";
    unset($arrWithProd[$key]->topping); // 把topping拿掉

    echo $value->PRO_ITEM_NO."***".$value->PRO_ITEM_NAME."***".$value->PRO_ITEM_PRICE."***";

    // INSERT INTO `ORDER_ITEM` (`ORDER_NO`, `PRO_ITEM_NO`, `ORD_PRO_ITEM_NUM`, `ORD_PRO_ITEM_PRICE`) VALUES ('1', '12', '1', '120');

    $sql = "INSERT INTO `ORDER_ITEM` (`ORDER_NO`, `PRO_ITEM_NO`, `ORD_PRO_ITEM_NUM`, `ORD_PRO_ITEM_PRICE`) VALUES ($orderList, $value->PRO_ITEM_NO, '1', $value->PRO_ITEM_PRICE);";


    $ordProdIntoDb = $pdo->prepare($sql);
    $ordProdIntoDb->execute();
  }

  
    // echo $ordTotOrder[0]->orderList;

    // echo  json_encode($ordTotOrder[0]);
   
    // foreach ($ordTotOrder[0] as $key => $value) {
        # code...
        // echo $key." ".$value;

        // $orderList = $ordTotOrder[$key];

        // $PRO_ITEM_NO = $value->PRO_ITEM_NO;
        // settype($PRO_ITEM_NO, "int");
        // echo $PRO_ITEM_NO;

        // $PRO_ITEM_PRICE = $value->PRO_ITEM_PRICE;
        // settype($PRO_ITEM_PRICE, "int");
        // echo $PRO_ITEM_PRICE;


        
        

        
    // };
     // echo "<script> alert('成功？'); </script>";
    
    // echo json_encode($orderList);
    
	
} catch (PDOException $e) {
	// echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";	
}
?>
