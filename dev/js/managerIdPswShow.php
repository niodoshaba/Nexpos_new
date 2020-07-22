<?php

try{
  // $dsn = "mysql:host=localhost; port=3306; dbname=G4_nexpos; cahrest=utf8;";
  // $user = "root";
  // $password = "root";
  // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO($dsn, $user, $password,$options);
  

  require_once("generalConnectDB.php");
  // require_once("ordCon.php");

  //抓出店長資料
  $sql = "SELECT EMP_NO, EMP_TITLE, EMP_NAME, EMP_PHONE, EMP_PWD, EMP_STAT
          FROM EMP
          WHERE EMP_TITLE = '店長';" ;

  $manager = $pdo->query($sql);
  $manager_json = array();
  while($row = $manager->fetch(PDO::FETCH_ASSOC)){
        $manager_json[] = $row;
  }
  echo json_encode($manager_json, JSON_UNESCAPED_UNICODE);
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>