<?php

try{
	// $dsn = "mysql:host=localhost;port=3306;dbname=G4_nexpos;charset=utf8";
	// $user = "root";
	// $password = "lily12345";
	// $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO( $dsn, $user, $password, $options); 

  require_once("generalConnectDB.php");
  // require_once("ordCon.php");
  

  $fillingItemName = $_POST["fillingItemName"];
  $fillingItemPrice = $_POST["fillingItemPrice"];
  $fillingItemOnOff = $_POST["fillingItemOnOff"];

  //send data to db
  $sql = "INSERT INTO FILLING_CATA(FILLING_ITEM_NAME,FILLING_ITEM_PRICE,FILLING_ITEM_ONOFF) 
          VALUES ('$fillingItemName','$fillingItemPrice','$fillingItemOnOff');";

  $fillingStatus = $pdo->prepare( $sql );
  $fillingStatus->execute();
  
  //同時重整頁面
echo "<script> alert('送出成功');
      location.href='../fillingCata.html';
      </script>" ;

  
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>
