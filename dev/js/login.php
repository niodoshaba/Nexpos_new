<?php
session_start();

try{
  $dsn = "mysql:host=localhost; port=3306; dbname=G4_nexpos; charset=utf8";
  $user = "root";
  $password = "root";
  $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  $pdo = new PDO($dsn, $user, $password, $options);

  //取得input輸入的帳密
  $loginId = $_POST["loginId"];
  $loginPassword = $_POST["loginPassword"];

  //前台登入判斷 
  $sql = "SELECT * FROM EMP WHERE EMP_NO='$loginId' AND EMP_PWD='$loginPassword'; ";
  $EMP = $pdo->prepare($sql);
  $EMP->execute();
  $empRow = $EMP->fetch(PDO::FETCH_ASSOC);
  $useInfo = "EMP_TITLE={$empRow["EMP_TITLE"]}&EMP_NAME={$empRow["EMP_NAME"]}";

  if($_POST['loginFront']){
    if($EMP->rowCount()==0){
      echo "<script>
              alert('請輸入正確的帳號、密碼>_<');
              location.href='../login.html';
            </script>";
    }else{
      // echo "<script>
      //         location.href='./tabShow.html?$useInfo';
      //       </script>";

      header("location:../tabShow.html?$useInfo");
    }
  }

  //後台登入判斷 
  $sql = "SELECT * FROM EMP WHERE EMP_NO='$loginId' AND EMP_PWD='$loginPassword' AND EMP_TITLE !='員工' AND EMP_TITLE != '廚師'; ";
  $EMP = $pdo->prepare($sql);
  $EMP->execute();
  $empRow = $EMP->fetch(PDO::FETCH_ASSOC);
  $useInfo = "EMP_TITLE={$empRow["EMP_TITLE"]}&EMP_NAME={$empRow["EMP_NAME"]}";
   
  if($_POST['loginBack']){
    if($EMP->rowCount()==0){
      echo "<script>
              alert('請輸入正確的帳號、密碼>_<');
              location.href='../login.html';
            </script>";
    }else {
      // echo "<script>
      //         location.href='../proManage.html?$useInfo';
      //       </script>";
    
      header("location:../proManage.html?$useInfo");

    }
  }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>

