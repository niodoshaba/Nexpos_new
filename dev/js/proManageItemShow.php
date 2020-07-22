<?php

try{
	// $dsn = "mysql:host=localhost;port=3306;dbname=G4_nexpos;charset=utf8";
	// $user = "root";
	// $password = "lily12345";
	// $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO( $dsn, $user, $password, $options); 



  // require_once("generalConnectDB.php");
  require_once("ordCon.php");

  
  $sql = "SELECT PRODUCT_ITEM.PRO_ITEM_NO,PRODUCT_CATA.PRO_CATA_NAME,PRODUCT_ITEM.PRO_ITEM_NAME,PRODUCT_ITEM.PRO_ITEM_PRICE,PRODUCT_ITEM.PRO_ITEM_ONOFF
          FROM PRODUCT_CATA,PRODUCT_ITEM
          WHERE PRODUCT_CATA.PRO_CATA_NO = PRODUCT_ITEM.PRO_CATA_NO;";

  $proItemInfo = $pdo->query($sql);
  $proItemInfo_json = array();
  while($row = $proItemInfo->fetch(PDO::FETCH_ASSOC)){
    $proItemInfo_json[] = $row;
  }
echo json_encode($proItemInfo_json,JSON_UNESCAPED_UNICODE);

}catch(PDOException $e){
    // echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
    echo "錯誤行號 : ", $e->getLine(), "<br>";
    echo "錯誤原因 : ", $e->getMessage(), "<br>"; 
}
?>
