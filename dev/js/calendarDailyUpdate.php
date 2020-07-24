<?php
try{
  require_once("generalConnectDB.php");
  

  $calendarPickDate = $_POST["calendarPickDate"];
  $resFormFirstName = $_POST["resFormFirstName"];
  $resFormLastName = $_POST["resFormLastName"];
  $resFormPhone = $_POST["resFormPhone"];
  $sex = $_POST["sex"];
  $resFormPeopleCount = $_POST["resFormPeopleCount"];
  $resFormTextArea = $_POST["resFormTextArea"];

  $sql="SELECT * FROM g4_nexpos.customer
  Where CUS_PHONE = $resFormPhone;
  ";

  $findRows = $pdo ->query($sql);

    
  if($findRows->rowCount()==0){


    //預約手機進入顧客表單

    $sql = "INSERT into CUSTOMER(CUS_PHONE,CUS_ID,CUS_STATE,CUS_GEN,CUS_FIRST,CUS_LAST) value ('$resFormPhone',1,1,'$sex','$resFormLastName','$resFormFirstName')";  

    $daily_state = $pdo->prepare( $sql );
    $daily_state->execute();

  // 更新當日可預約人數
    $sql = "UPDATE DAILY_RES SET DAILY_NUM = DAILY_NUM + '$resFormPeopleCount' WHERE DAILY_DATE = '$calendarPickDate'";
    
    $daily_state = $pdo->prepare( $sql );
    $daily_state->execute();

  

  }else{

    $sql ="UPDATE DAILY_RES SET DAILY_NUM = DAILY_NUM + '$resFormPeopleCount' WHERE DAILY_DATE = '$calendarPickDate'";
      
    $daily_state = $pdo->prepare( $sql );
    $daily_state->execute();

    $sql= "UPDATE `customer` SET `CUS_ID` = '1', `CUS_STATE` = '1', `CUS_LAST` = '$resFormLastName', `CUS_FIRST` = '$resFormFirstName', `CUS_GEN` = '$sex' WHERE (`CUS_PHONE` = '$resFormPhone');";


    $daily_state = $pdo->prepare( $sql );
    $daily_state->execute();

    
  }


  $sql = "INSERT into RESERVATION value ('$resFormPhone','$calendarPickDate',$resFormPeopleCount,'$resFormTextArea')";

  $daily_state = $pdo->prepare( $sql );
  $daily_state->execute();
  

echo "<script> alert('送出成功');
      location.href='../reservationCalendar.html';
</script>" ;

  
}catch(PDOException $e){
  echo $e->getMessage();
}
?>
