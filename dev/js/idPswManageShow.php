<?php

try{
  require_once("generalConnectDB.php");
   

  //抓出員工資料
  $sql = "SELECT EMP_NO, EMP_TITLE, EMP_NAME, EMP_PHONE, EMP_PWD, EMP_STAT
          FROM EMP;" ;

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