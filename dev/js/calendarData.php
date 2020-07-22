<?php 
try {
	// $dsn = "mysql:host=localhost;port=3306;dbname=g4_nexpos;charset=utf8";
	// $user = "root";
	// $password = "95123654";
	// $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
	// $pdo = new PDO( $dsn, $user, $password, $options); 

	require_once("generalConnectDB.php");
  // require_once("ordCon.php");
	
	$sql = "select * from `DAILY_RES`";
	$DAILY = $pdo->query($sql);


    $DAILY_TABLE = array();
    while($row = $DAILY->fetch(PDO::FETCH_ASSOC)){
        $DAILY_TABLE[] = $row;
    }

    echo json_encode($DAILY_TABLE);
	
} catch (PDOException $e) {
	// echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";	
}
?>