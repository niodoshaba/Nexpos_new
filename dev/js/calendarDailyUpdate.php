<?php
try{
	$dsn = "mysql:host=localhost;port=3306;dbname=test;charset=utf8";
	$user = "root";
	$password = "95123654";
	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  $pdo = new PDO( $dsn, $user, $password, $options); 
  

  $calendarPickDate = $_POST["calendarPickDate"];
  // $resFormName = $_POST["resFormName"];
  // $resFormPhone = $_POST["resFormPhone"];
  // $sex = $_POST["sex"];
  $resFormPeopleCount = $_POST["resFormPeopleCount"];
  $resFormTextArea = $_POST["resFormTextArea"];

  $sql = "UPDATE DAILY_RES SET DAILY_NUM = DAILY_NUM + '$resFormPeopleCount' WHERE DAILY_DATE = '$calendarPickDate' ";
  $daily_state = $pdo->prepare( $sql );
  $daily_state->execute();
  
echo "<script> alert('送出成功');
      location.href='../../dest/reservationCalendar.html';
</script>" ;

  
}catch(PDOException $e){
  echo $e->getMessage();
}
?>
