<?php
session_start();

try{
  require_once("generalConnectDB.php");
   

  //抓出員工資料
  $sql = "SELECT CUS_PHONE, CUS_ID, CUS_STATE, CUS_LAST, CUS_FIRST, CUS_GEN, CUS_BIRTH, CUS_EMAIL, CUS_POINT
          FROM CUSTOMER WHERE CUS_ID='1';" ;

  $empIdPsw = $pdo->query($sql);
  $empIdPsw_json = array();
  while($row = $empIdPsw->fetch(PDO::FETCH_ASSOC)){
        $empIdPsw_json[] = $row;
  }
  echo json_encode($empIdPsw_json, JSON_UNESCAPED_UNICODE);
  
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>