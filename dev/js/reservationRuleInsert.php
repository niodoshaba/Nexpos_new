<?php

try{
	require_once("generalConnectDB.php");
  

  $resStartDate =$_POST["resStartDate"];
  $resEndDate =$_POST["resEndDate"];
  $resOpenOrNot2 = $_POST["resOpenOrNot2"];
  $resHowMuchPeople2 = $_POST["resHowMuchPeople2"];

  //更新當日可預約人數
  $sql = "UPDATE DAILY_RES SET DAILY_AVA = '$resHowMuchPeople2' , DAILY_STA = '$resOpenOrNot2' WHERE DAILY_DATE BETWEEN '$resStartDate' and '$resEndDate'";



  $daily_state = $pdo->prepare( $sql );
  $daily_state->execute();

  
echo "<script> alert('送出成功');
location.href='../reservationRule.html'
</script>" ;

  
}catch(PDOException $e){
  echo $e->getMessage();
}
?>


