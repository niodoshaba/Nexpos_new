<?php 

$allDisInputData = json_decode($_POST["allDisInputData"]);

try{
  // $dsn = "mysql:host=localhost; port=3306; dbname=G4_nexpos; charset=utf8";
  // $user = "root";
  // $password = "root";
  // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO($dsn, $user, $password, $options);
  require_once("generalConnectDB.php");

  $allDiscount = $allDisInputData->allDiscount * 0.1; //輸入的折扣金額
  $allDisName = $allDisInputData->allDisName; //活動名稱
  $allDisStart = $allDisInputData->allDisStart; //活動期間
  $allDisEnd = $allDisInputData->allDisEnd; //活動期間

  // 將資料寫入折扣活動資料庫
  $sql = "INSERT INTO DISCOUNT (DIS_CATA_NO, DIS_PCTALL, DIS_NAME, DIS_START, DIS_END)
          VALUES('0','$allDiscount','$allDisName','$allDisStart','$allDisEnd'); ";

  $discountsql = $pdo->prepare($sql);
  $discountsql->execute();

}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>  
