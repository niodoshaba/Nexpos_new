<?php 

try {
    require_once("generalConnectDB.php");
   

    $CUS_PHONE = $_POST["CUS_PHONE"];
    $CUS_ID = $_POST["CUS_ID"];
    $CUS_STATE = $_POST["CUS_STATE"];
    $CUS_LAST = $_POST["CUS_LAST"];
    $CUS_FIRST = $_POST["CUS_FIRST"];
    $CUS_GEN = $_POST["CUS_GEN"];
    $CUS_BIRTH = $_POST["CUS_BIRTH"];
    $CUS_EMAIL = $_POST["CUS_EMAIL"];
    $CUS_POINT = $_POST["CUS_POINT"];

    $sql="SELECT * FROM customer Where CUS_PHONE = $CUS_PHONE;";

    $findRows = $pdo ->query($sql);

        
    if($findRows->rowCount()==0){

    $sql = "INSERT into CUSTOMER value ('$CUS_PHONE','$CUS_ID','$CUS_STATE','$CUS_LAST' ,'$CUS_FIRST', '$CUS_GEN', '$CUS_BIRTH', '$CUS_EMAIL', '$CUS_POINT')";

    $memberJoin = $pdo->prepare( $sql );
    $memberJoin->execute();  

  }else{
    $sql= "UPDATE customer SET CUS_ID = '$CUS_ID', CUS_STATE = '$CUS_STATE', CUS_LAST = '$CUS_LAST', CUS_FIRST = '$CUS_FIRST', CUS_GEN = '$CUS_GEN', CUS_BIRTH = '$CUS_BIRTH', CUS_EMAIL = '$CUS_EMAIL', CUS_POINT = '$CUS_POINT'
           WHERE (`CUS_PHONE` = '$CUS_PHONE');";

    $memberJoin = $pdo->prepare( $sql );
    $memberJoin->execute();
  }

echo "<script> alert('送出成功');
      
</script>" ;

} catch (PDOException $e) {
 // echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
 echo "錯誤行號 : ", $e->getLine(), "<br>";
 echo "錯誤原因 : ", $e->getMessage(), "<br>"; 
}
?>