<?php 

$ItemInputData = json_decode($_POST['ItemInputData']);

try{
  require_once("generalConnectDB.php");
   

  $productsNo = $ItemInputData->disItemNo; //品項編號
  $discount = $ItemInputData->disItemdiscount * 0.1; //輸入的折扣金額
  $activeName = $ItemInputData->disItemName; //活動名稱
  $timeStart = $ItemInputData->disItemStart; //活動期間
  $timeEnd = $ItemInputData->disItemEnd; //活動期間

  
  //將資料寫入折扣活動資料庫
  $sql = "INSERT INTO DISCOUNT (DIS_CATA_NO, DIS_PCTALL, DIS_NAME, DIS_START, DIS_END)
          VALUES('1','$discount','$activeName','$timeStart','$timeEnd'); ";
  
  $discountsql = $pdo->prepare($sql);
  $discountsql->execute();

  // for($i=0; $i<count($productsNo); $i++){
  //   echo $productsNo[$i], "," ;
  // }
  // echo $productsNo;

  //將勾選到的品項寫進資料庫
  foreach($productsNo as $key => $values){
    $productsNo[$key] = $values;

    $sql = "INSERT INTO DIS_ITEM (PRO_ITEM_NUMBER,DIS_NO)
            VALUES('$values',(SELECT DIS_NO
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
