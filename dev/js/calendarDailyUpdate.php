<?php
try{
	$dsn = "mysql:host=localhost;port=3306;dbname=test;charset=utf8";
	$user = "root";
	$password = "95123654";
	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  $pdo = new PDO( $dsn, $user, $password, $options); 
  

  $calendarPickDate = $_POST["calendarPickDate"];
  $resFormFirstName = $_POST["resFormFirstName"];
  $resFormLastName = $_POST["resFormLastName"];
  $resFormPhone = $_POST["resFormPhone"];
  $sex = $_POST["sex"];
  $resFormPeopleCount = $_POST["resFormPeopleCount"];
  $resFormTextArea = $_POST["resFormTextArea"];

  //更新當日可預約人數
  $sql = "UPDATE DAILY_RES SET DAILY_NUM = DAILY_NUM + '$resFormPeopleCount' WHERE DAILY_DATE = '$calendarPickDate'";
  //預約手機進入顧客表單
  $sql = "INSERT into CUSTOMER(CUS_PHONE,CUS_ID,CUS_STATE,CUS_GEN,CUS_FIRST,CUS_LAST) value ('$resFormPhone',1,1,'$sex','$resFormFirstName','$resFormLastName')";  
  //預約資料進入預約表單
  // $sql = "INSERT into RESERVATION value ('$resFormPhone','$calendarPickDate',$resFormPeopleCount,'$resFormTextArea')";

  // $sql = "UPDATE RESERVATION SET RES_DATE = '$calendarPickDate' and RES_NUM = '$resFormPeopleCount' and RES_NOTE = '$resFormTextArea' and CUS_PHONE ='$resFormPhone'";

  $daily_state = $pdo->prepare( $sql );
  $daily_state->execute();


  $sql = "INSERT into RESERVATION value ('$resFormPhone','$calendarPickDate',$resFormPeopleCount,'$resFormTextArea')";

  $daily_state = $pdo->prepare( $sql );
  $daily_state->execute();
  

echo "<script> alert('送出成功');
      location.href='../../dest/reservationCalendar.html';
</script>" ;

  
}catch(PDOException $e){
  echo $e->getMessage();
}
?>
