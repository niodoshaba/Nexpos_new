<?php
session_start();

try{
  // $dsn = "mysql:host=localhost; port=3306; dbname=G4_nexpos; charset=utf8";
  // $user = "root";
  // $password = "root";
  // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO($dsn, $user, $password, $options);

  require_once("generalConnectDB.php");
  // require_once("ordCon.php");

  
  //取得input輸入的帳密
  $memId = $_POST["memId"];
  $memPsw = $_POST["memPsw"];

  //撈店長帳密
  $sql = "SELECT * FROM EMP WHERE EMP_NO='$memId' AND EMP_PWD='$memPsw' AND EMP_TITLE = '店長' ";
  $EMP = $pdo->prepare($sql);
  $EMP->execute();

  // 抓使用者ip
  if(!empty( $_SERVER['REMOTE_ADDR'])){
      $userip = $_SERVER['REMOTE_ADDR'];
  }
  
  if(!isset($_SESSION['login_limit'])){ //如果尚未寫入限制值
    if($userip != $_SESSION['userip']){ //確認現在ip與之前存過的ip不同
      $_SESSION['login_limit'] = 3; //限制同個ip只能輸入三次
    }
    // 若使用者ip尚未寫入 將此ip存入session
    if(!isset($_SESSION['userip'])){
      $_SESSION['userip'] = $userip;
    }
  }

  if($_SESSION['login_limit']<=0){
    //撈老闆帳密
    $sql = "SELECT * FROM EMP WHERE EMP_NO='$memId' AND EMP_PWD='$memPsw' AND EMP_TITLE = '老闆';" ;
    $EMPBoss = $pdo->prepare($sql);
    $EMPBoss->execute();
    //如果限制值<0，請輸入老闆帳密登入
    if($EMPBoss->rowCount()== 0){
      echo "<script>
              alert('您的登入次數超過限制，請輸入老闆的帳號密碼!');
              location.href='../dailyStatementLogin.html';
            </script>";
    }else{
     echo "<script>
              alert('登入成功');
              location.href='../dailyStatement.html';
            </script>";
    }
  }else{
      //日結登入判斷
    if($EMP->rowCount()==0){
      if($userip == $_SESSION['userip']){
        $_SESSION['login_limit']--;
        // echo "您還有", $_SESSION['login_limit'], "次的登入機會";
        echo "<script>
                alert('您還有", $_SESSION['login_limit'], "次的登入機會');
                location.href='../dailyStatementLogin.html';
              </script>";
      ;
      }else{
        $_SESSION['userip'] = $userip;
        $_SESSION['login_limit'] = 3;
      }
    }else{
      echo "<script>
              alert('登入成功');
              location.href='../dailyStatement.html';
            </script>";
      $_SESSION['login_limit'] = 3;
    }
  }
}catch(PDOException $e){
  echo $e->getMessage();
}
?>


