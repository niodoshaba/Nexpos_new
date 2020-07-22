<?php

try{
	// $dsn = "mysql:host=localhost;port=8889;dbname=G4_nexpos;charset=utf8";
	// $user = "root";
	// $password = "root";
	// $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO( $dsn, $user, $password, $options); 
  

// require_once("generalConnectDB.php");
require_once("ordCon.php");

  $CUS_LAST = $_POST["CUS_LAST"];
  $CUS_FIRST = $_POST["CUS_FIRST"];
  $CUS_GEN = $_POST["CUS_GEN"];
  $CUS_BIRTH = $_POST["CUS_BIRTH"];
  $CUS_PHONE = $_POST["CUS_PHONE"];
  $CUS_EMAIL = $_POST["CUS_EMAIL"];
  $CUS_POINT = $_POST["CUS_POINT"];
  $CUS_ID = $_POST["CUS_ID"];
  $CUS_STATE = $_POST["CUS_STATE"];
 

  //send data to db
  $sql = "INSERT INTO CUSTOMER
          VALUES ('$CUS_LAST','$CUS_FIRST','$CUS_GEN','$CUS_BIRTH','$CUS_PHONE','$CUS_EMAIL','$CUS_POINT''$CUS_ID','$CUS_STATE',);";

  $proStatus = $pdo->prepare( $sql );
  $proStatus->execute();
  
  //同時重整頁面
echo "<script> alert('送出成功');
      location.href='../memInfo.html';
      </script>" ;

  
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>
