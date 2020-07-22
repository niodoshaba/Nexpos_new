<?php
// session_start();
try{
	// $dsn = "mysql:host=localhost;port=3306;dbname=g4_nexpos;charset=utf8";
	// $user = "root";
	// $password = "95123654";
	// $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO( $dsn, $user, $password, $options); 


  require_once("generalConnectDB.php");
  // require_once("ordCon.php");


  $sql = "SELECT DAILY_DATE,DAILY_AVA,DAILY_STA 
          FROM DAILY_RES
          WHERE DAILY_DATE BETWEEN :anaStart AND :anaEnd;";

  $daily_state = $pdo->prepare($sql);
  $daily_state->bindValue(":anaStart", $_POST["anaStart"]);
  $daily_state->bindValue(":anaEnd", $_POST["anaEnd"]);
  $daily_state->execute();

  //更新當日可預約人數
  
  $daily_state_json = array();
  
  while($row = $daily_state->fetch(PDO::FETCH_ASSOC)){
    $daily_state_json[] = $row;
}
// echo $daily_state_json;
echo json_encode($daily_state_json, JSON_UNESCAPED_UNICODE);

  
}catch(PDOException $e){
  echo $e->getMessage();
}
?>
