<?php
try{
	// $dsn = "mysql:host=localhost;port=3306;dbname=g4_nexpos;charset=utf8";
	// $user = "root";
	// $password = "95123654";
	// $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO( $dsn, $user, $password, $options); 

  require_once("generalConnectDB.php");
  // require_once("ordCon.php");

  $resRuledate = $_POST["resRuledate"];
  $resOpenOrNot = $_POST["resOpenOrNot"];
  $resHowMuchPeople = $_POST["resHowMuchPeople"];

  //更新當日可預約人數
  $sql = "UPDATE  DAILY_RES 
          SET     DAILY_AVA = '$resHowMuchPeople' , DAILY_STA = '$resOpenOrNot'  
          WHERE   DAILY_DATE = '$resRuledate'";

  $daily_state = $pdo->prepare( $sql );
  $daily_state->execute();
  
echo "<script> alert('送出成功');
      location.href='../reservationRule.html'
</script>" ;

  
}catch(PDOException $e){
  echo $e->getMessage();
}
?>

<!-- WHERE   DAILY_DATE = '$resRuledate' -->