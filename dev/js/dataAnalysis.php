<?php 
try {
	require_once("generalConnectDB.php");
   

/////////////////////預約日期///////////////////////
	$sql = "SELECT DAILY_DATE
			FROM  DAILY_RES
			WHERE DAILY_DATE BETWEEN :anaStart AND :anaEnd
			";

	$analysisDate = $pdo->prepare($sql);
	$analysisDate->bindValue(":anaStart", $_POST["anaStart"]);
	$analysisDate->bindValue(":anaEnd", $_POST["anaEnd"]);
	$analysisDate->execute();

    $analysis1 = array();
    while($row = $analysisDate->fetch(PDO::FETCH_ASSOC)){
        $analysis1[] = $row;
	}
	

/////////////////////預約人數///////////////////////
	$sql = "SELECT DAILY_NUM
	FROM  DAILY_RES
	WHERE DAILY_DATE BETWEEN :anaStart AND :anaEnd
	";
	$analysisNum = $pdo->prepare($sql);
	$analysisNum->bindValue(":anaStart", $_POST["anaStart"]);
	$analysisNum->bindValue(":anaEnd", $_POST["anaEnd"]);
	$analysisNum->execute();
	

	$analysis2 = array();
	while($row = $analysisNum->fetch(PDO::FETCH_ASSOC)){
	$analysis2[] = $row;
	}

///////////////////訂單日期///////////////////////
	$sql = "SELECT DISTINCT ORDER_DATE 
	FROM  ORDER_LIST
	WHERE ORDER_DATE  BETWEEN :anaStart AND :anaEnd
	ORDER BY ORDER_DATE ASC
	";
	$analysisOrdDate = $pdo->prepare($sql);
	$analysisOrdDate->bindValue(":anaStart", $_POST["anaStart"]);
	$analysisOrdDate->bindValue(":anaEnd", $_POST["anaEnd"]);
	$analysisOrdDate->execute();


	$analysis3 = array();
	while($row = $analysisOrdDate->fetch(PDO::FETCH_ASSOC)){
	$analysis3[] = $row;
	}


///////////////////訂單金額///////////////////////
	$sql = "SELECT SUM(ORDER_TTL_PRICE)
	FROM  ORDER_LIST
	WHERE ORDER_DATE  BETWEEN :anaStart AND :anaEnd	
	GROUP BY ORDER_DATE
	";

	$analysisOrdMoney = $pdo->prepare($sql);
	$analysisOrdMoney->bindValue(":anaStart", $_POST["anaStart"]);
	$analysisOrdMoney->bindValue(":anaEnd", $_POST["anaEnd"]);
	$analysisOrdMoney->execute();


	$analysis4 = array();
	while($row = $analysisOrdMoney->fetch(PDO::FETCH_ASSOC)){
	$analysis4[] = $row;
	}

///////////////////訂單人數///////////////////////
$sql = "SELECT SUM(ORDER_NUM)
FROM  ORDER_LIST
WHERE ORDER_DATE  BETWEEN :anaStart AND :anaEnd
GROUP BY ORDER_DATE
";
$analysisOrdNum = $pdo->prepare($sql);
$analysisOrdNum->bindValue(":anaStart", $_POST["anaStart"]);
$analysisOrdNum->bindValue(":anaEnd", $_POST["anaEnd"]);
$analysisOrdNum->execute();


$analysis5 = array();
while($row = $analysisOrdNum->fetch(PDO::FETCH_ASSOC)){
$analysis5[] = $row;
}

///////////////////商品銷量///////////////////////
$sql = "SELECT SUM(ORD_PRO_ITEM_NUM)
FROM  ORDER_ITEM,order_list
where order_item.order_no = order_list.order_no AND ORDER_DATE  BETWEEN :anaStart AND :anaEnd
group by PRO_ITEM_NO;
";

$analysisProNum = $pdo->prepare($sql);
$analysisProNum->bindValue(":anaStart", $_POST["anaStart"]);
$analysisProNum->bindValue(":anaEnd", $_POST["anaEnd"]);
$analysisProNum->execute();


$analysis6 = array();
while($row = $analysisProNum->fetch(PDO::FETCH_ASSOC)){
$analysis6[] = $row;
}

///////////////////商品們///////////////////////
$sql = "SELECT distinct PRODUCT_ITEM.PRO_ITEM_NAME
FROM  ORDER_ITEM,order_list,product_item
where order_item.order_no = order_list.order_no AND order_item.PRO_ITEM_NO = PRODUCT_ITEM.PRO_ITEM_NO AND ORDER_DATE  BETWEEN :anaStart AND :anaEnd;
";

$analysisProItem = $pdo->prepare($sql);
$analysisProItem->bindValue(":anaStart", $_POST["anaStart"]);
$analysisProItem->bindValue(":anaEnd", $_POST["anaEnd"]);
$analysisProItem->execute();


$analysis7 = array();
while($row = $analysisProItem->fetch(PDO::FETCH_ASSOC)){
$analysis7[] = $row;
}

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

	// 1是預約日期 2是預約人數 3是訂單日期 4是訂單金額 5是訂單人數 6是商品銷量 7是商品編號

	$allAnalysis = array($analysis1,$analysis2,$analysis3,$analysis4,$analysis5,$analysis6,$analysis7);

    echo json_encode($allAnalysis);
	
	
	// 1.日期+營收
	// 2.日期+來客數

	// 3.日期+商品銷量（全品項、分類品項


} catch (PDOException $e) {
	// echo "系統暫時無法提供服務, 請通知系統維護人員<br>";
	echo "錯誤行號 : ", $e->getLine(), "<br>";
	echo "錯誤原因 : ", $e->getMessage(), "<br>";	
}
?>