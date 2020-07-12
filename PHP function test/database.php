<?php 


try {
    $dsn = "mysql:host=localhost;port=3306;dbname=pos;charset=utf8";
	$user = "root";
	$password = "root";
	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);    
	$pdo = new PDO( $dsn, $user, $password, $options); 

    $name=$_POST['name'];
    $email=$_POST['email'];
    $phone=$_POST['phone'];
    $city=$_POST['city'];

    //insert member info to database
    $sql = "INSERT into user_data value ('$name', '$email', '$phone', '$city')";
	$memInfo = $pdo->prepare ($sql);
    $memInfo->execute();

    echo 
    "<script> alert('送出成功');
    location.href='../../dest/memberJoin.html';
    </script>";

} catch (PDOException $e) {
	// echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";	
}
?>