<?php
try{
	require_once("generalConnectDB.php");

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