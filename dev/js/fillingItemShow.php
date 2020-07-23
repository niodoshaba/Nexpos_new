<?php

try{
	require_once("generalConnectDB.php");
   
  
  $sql = "SELECT FILLING_ITEM.FILLING_ITEM_NO,FILLING_CATA.FILLING_CATA_NAME,FILLING_ITEM.FILLING_ITEM_NAME,FILLING_ITEM.FILLING_ITEM_PRICE,FILLING_ITEM.FILLING_ITEM_ONOFF
          FROM FILLING_CATA,FILLING_ITEM
          WHERE FILLING_CATA.FILLING_CATA_NO = FILLING_ITEM.FILLING_CATA_NO;";

  $fillingItemInfo = $pdo->query($sql);
  $fillingItemInfo_json = array();
  while($row = $fillingItemInfo->fetch(PDO::FETCH_ASSOC)){
    $fillingItemInfo_json[] = $row;
  }
echo json_encode($fillingItemInfo_json,JSON_UNESCAPED_UNICODE);

}catch(PDOException $e){
    // echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
    echo "錯誤行號 : ", $e->getLine(), "<br>";
    echo "錯誤原因 : ", $e->getMessage(), "<br>"; 
}
?>
