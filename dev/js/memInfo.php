<?php

try{
	// $dsn = "mysql:host=localhost;port=8889;dbname=G4_nexpos;charset=utf8";
	// $user = "root";
	// $password = "root";
	// $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO( $dsn, $user, $password, $options); 
  
  
  require_once("generalConnectDB.php");
  // require_once("ordCon.php");

  $sql = "SELECT * FROM CUSTOMER WHERE CUS_ID = '1'";

  $proInfo = $pdo->query($sql);
  $proInfo_json = array();
  while($row = $proInfo->fetch(PDO::FETCH_ASSOC)){
    $proInfo_json[] = $row;
  }
echo json_encode($proInfo_json,JSON_UNESCAPED_UNICODE);

}catch(PDOException $e){
    // echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
    echo "錯誤行號 : ", $e->getLine(), "<br>";
    echo "錯誤原因 : ", $e->getMessage(), "<br>"; 
}
?>
