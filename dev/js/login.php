<?php
session_start();


try{

  require_once("generalConnectDB.php");
   

  //取得input輸入的帳密
  $loginId = $_POST["loginId"];
  $loginPassword = $_POST["loginPassword"];

  //前台登入判斷 
  $sql = "SELECT * FROM EMP WHERE EMP_NO='$loginId' AND EMP_PWD='$loginPassword'; ";
  $EMP = $pdo->prepare($sql);
  $EMP->execute();
  $empRow = $EMP->fetch(PDO::FETCH_ASSOC);
  $useInfo = "EMP_TITLE={$empRow["EMP_TITLE"]}&EMP_NAME={$empRow["EMP_NAME"]}";

  if(isset($_POST['loginFront'])){
    if($EMP->rowCount()==0){
      echo "<script>
              alert('請輸入正確的帳號、密碼>_<');
              location.href='../login.html';
            </script>";
    }else{
      echo "<script>
              location.href='../posHomeTab.html?$useInfo';
            </script>";
    }
  }

  //後台登入判斷 
  $sql = "SELECT * FROM EMP WHERE EMP_NO='$loginId' AND EMP_PWD='$loginPassword' AND EMP_TITLE !='員工' AND EMP_TITLE != '廚師'; ";
  $EMP = $pdo->prepare($sql);
  $EMP->execute();
  $empRow = $EMP->fetch(PDO::FETCH_ASSOC);
  $useInfo = "EMP_TITLE={$empRow["EMP_TITLE"]}&EMP_NAME={$empRow["EMP_NAME"]}";
   
  if(isset($_POST['loginBack'])){
    if($EMP->rowCount()==0){
      echo "<script>
              alert('請輸入正確的帳號、密碼>_<');
              location.href='../login.html';
            </script>";
    }else {
      echo "<script>
              location.href='../proManage.html?$useInfo';
            </script>";
    }
  }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>


