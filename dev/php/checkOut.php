<?php
 
try{ 
    $dsn = "mysql:host=localhost;post=3306;dbname=g4_nexpos;charset=utf8";
    $user = "root";
    $password = "1u3ru894jo4SPUR";
    $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
    $pdo = new PDO($dsn, $user, $password, $options);
    
    //搜尋紅利規則
    $bonusRule_sql = "SELECT BONUS_NAME 
                      FROM bonus_rule;"

    $bonusRule = $pdo->query($bonusRule_sql);
    $bonusRuleArr = array();
    while($pdoRow = $bonusRule->fetch(PDO::FETCH_ASSOC)){
        $bonusRuleArr[] = $pdoRow;
    }
    $sendBackbonusRule = array_pop($bonusRuleArr[0]); 
    
    print_r($sendBackbonusRule);
    //搜尋會員，若會為會員則帶出X先生/小姐你好，顯示可用點數
    // $search_sql = "SELECT  CUS_LAST,CUS_POINT,CUS_GEN
    //                FROM    customer
    //                WHERE   CUS_PHONE = $phone AND CUS_ID = 1;";



    }catch (PDOException $e){
        echo $e->getMessage();

    }

?>