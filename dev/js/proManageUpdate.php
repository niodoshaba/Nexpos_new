<?php
$proUpdateData = json_decode($_POST['proUpdateData']);

try{
    // $dsn = "mysql:host=localhost;port=3306;dbname=G4_nexpos;charset=utf8";
    // $user = "root";
    // $password = "lily12345";
    // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
    // $pdo = new PDO( $dsn, $user, $password, $options); 

    // require_once("generalConnectDB.php");
  require_once("ordCon.php");
  
  $proCataNo = $proUpdateData->proCataNo;
  $proCataName = $proUpdateData->proCataName;
  $proCataOnOff = $proUpdateData->proCataOnOff;

  //update data to db
  $sql = "UPDATE PRODUCT_CATA
          SET PRO_CATA_NAME = '$proCataName', PRO_CATA_ONOFF = '$proCataOnOff' 
          WHERE PRO_CATA_NO = '$proCataNo';";

  $proStatus = $pdo->prepare( $sql );
  $proStatus->execute();

  echo "<script> alert('送出成功');
  location.href='../proManage.html'
</script>" ;

}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>
