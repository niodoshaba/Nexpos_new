<?php 

$disItemUpdateData = json_decode($_POST['disItemUpdateData']);

try{
  // $dsn = "mysql:host=localhost; port=3306; dbname=G4_nexpos; charset=utf8";
  // $user = "root";
  // $password = "root";
  // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO($dsn, $user, $password, $options);
  
// require_once("generalConnectDB.php");
require_once("ordCon.php");

  $disNo = $disItemUpdateData->disNo;
  $productsNo = $disItemUpdateData->disItemNo; //品項編號
  $discount = $disItemUpdateData->disItemDiscount * 0.1; //輸入的折扣金額
  $activeName = $disItemUpdateData->disItemName; //活動名稱
  $timeStart = $disItemUpdateData->disItemStart; //活動期間
  $timeEnd = $disItemUpdateData->disItemEnd; //活動期間
  
  //將資料寫入折扣活動資料庫
  $sql = "UPDATE DISCOUNT 
          SET DIS_CATA_NO = '1' ,DIS_PCTALL = '$discount', DIS_NAME = '$activeName', DIS_START = '$timeStart', DIS_END = '$timeEnd'
          WHERE DIS_NO = '$disNo';" ;
  
  $discountsql = $pdo->prepare($sql);
  $discountsql->execute();

  // for($i=0; $i<count($productsNo); $i++){
  //   echo $productsNo[$i], "," ;
  // }
  // echo $productsNo;

  //將勾選到的品項寫進資料庫
  foreach($productsNo as $key => $values){
    $productsNo[$key] = $values;


    $sql = "UPDATE DIS_ITEM 
            SET PRO_ITEM_NUMBER = '$values', DIS_NO = (SELECT DIS_NO
                                                        FROM DISCOUNT
                                                        ORDER BY DIS_NO DESC LIMIT 1
                                                        )); ";
         
    $discountsql = $pdo->prepare($sql);
    $discountsql->execute();
  };

}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>  
