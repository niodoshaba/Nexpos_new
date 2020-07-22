<?php
// session_start();

$idPswUpdateData = json_decode($_POST['idPswUpdateData']);

// $idPswUpdateData = json_decode('{"CUS_LAST":"高","CUS_FIRST":"斯特","CUS_GEN":"1","CUS_BIRTH":"1996-09-02","CUS_PHONE":"0934728938","CUS_EMAIL":"bangbangwei@gmail.com","CUS_POINT":"300","CUS_ID":"1","CUS_STATE":"1"}');
// echo json_encode($idPswUpdateData);
try{
  // $dsn = "mysql:host=localhost; port=8889; dbname=G4_nexpos; cahrest=utf8;";
  // $user = "root";
  // $password = "root";
  // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO($dsn, $user, $password,$options);


  // require_once("generalConnectDB.php");
  require_once("ordCon.php");
  
  $CUS_LAST = $idPswUpdateData->CUS_LAST;
  $CUS_FIRST = $idPswUpdateData->CUS_FIRST;
  $CUS_GEN = $idPswUpdateData->CUS_GEN;
  $CUS_BIRTH = $idPswUpdateData->CUS_BIRTH;
  $CUS_PHONE = $idPswUpdateData->CUS_PHONE;
  $CUS_EMAIL = $idPswUpdateData->CUS_EMAIL;
  $CUS_POINT = $idPswUpdateData->CUS_POINT;
  $CUS_ID = $idPswUpdateData->CUS_ID;
  $CUS_STATE = $idPswUpdateData->CUS_STATE;


  $sql = "UPDATE CUSTOMER
          SET CUS_LAST = '$CUS_LAST', CUS_FIRST = '$CUS_FIRST', CUS_GEN = '$CUS_GEN', CUS_BIRTH = '$CUS_BIRTH',  CUS_EMAIL = '$CUS_EMAIL', CUS_POINT = '$CUS_POINT', CUS_ID = '$CUS_ID', CUS_STATE = '$CUS_STATE'
          WHERE CUS_PHONE = '$CUS_PHONE';"  ;
echo $sql, "<br>";
  $emp = $pdo->prepare($sql);
  $emp->execute();
  
  
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>