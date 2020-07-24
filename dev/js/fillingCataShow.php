<?php

try{
	require_once("generalConnectDB.php");
   
  
  $sql = "SELECT * FROM FILLING_CATA";

  $fillingCataInfo = $pdo->query($sql);
  $fillingCataInfo_json = array();
  while($row = $fillingCataInfo->fetch(PDO::FETCH_ASSOC)){
    $fillingCataInfo_json[] = $row;
  }
echo json_encode($fillingCataInfo_json,JSON_UNESCAPED_UNICODE);

}catch(PDOException $e){
    // echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
    echo "錯誤行號 : ", $e->getLine(), "<br>";
    echo "錯誤原因 : ", $e->getMessage(), "<br>"; 
}
?>
