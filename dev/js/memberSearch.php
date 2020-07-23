<?php
// $dbhost = 'localhost:8889';  // mysql伺服器主機地址
// $dbuser = 'root';            // mysql使用者名稱
// $dbpass = 'root';
// $database = 'G4_nexpos';         // mysql使用者名稱密碼
// $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $database);

// pdo寫法
// $dsn = "mysql:host=localhost;port=8889;dbname=G4_nexpos;charset=utf8";
// $user = "root";
// $password = "lily12345";
// $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
// $pdo = new PDO( $dsn, $user, $password, $options); 


// require_once("generalConnectDB.php");
require_once("ordCon.php");


if(isset($_GET['s'])){
    $s = "%".$_GET['s']."%";
    $sql =  "SELECT * FROM CUSTOMER WHERE CUS_LAST LIKE :s OR CUS_FIRST LIKE :s OR CUS_PHONE LIKE :s";
    $member = $pdo->prepare($sql);
    $member -> bindValue(":s",$s);
    $member -> execute();
    $customer = $member->fetchAll(PDO::FETCH_ASSOC);
    if(count(($customer)) == 0){//如果比對不到
        echo 1;
    }else{
        // 表頭
        echo "
        <table>
            <tr>
                <td>姓</td>
                <td style='width: 75px'>名</td>
                <td style='width: 75px'>性別</td>
                <td>手機</td>
                <td>生日</td>
                <td>e-mail</td>
                <td style='width: 75px'>身份</td>
                <td style='width: 80px'>狀態</td>
                <td>點數</td>
            </tr>

        ";
        foreach ($customer as $key => $value) {
            echo "<tr>";
            echo "<td>" . $value['CUS_LAST'] . "</td>";
            echo "<td>" . $value['CUS_FIRST'] . "</td>";
            echo "<td>" . $value['CUS_GEN'] . "</td>";
            echo "<td>" . $value['CUS_PHONE'] . "</td>";
            echo "<td>" . $value['CUS_BIRTH'] . "</td>"; 
            echo "<td>" . $value['CUS_EMAIL'] . "</td>";
            echo "<td class='cusIdTd'>" . $value['CUS_ID'] . "</td>";
            echo "<td class='cusStateTd'>" . $value['CUS_STATE'] . "</td>";
            echo "<td>" . $value['CUS_POINT'] . "</td>";
            echo "</tr>";
        }
    }
}else{
    // 表頭
    echo "
    <table>
            <tr>
                <td>姓</td>
                <td style='width: 75px'>名</td>
                <td style='width: 75px'>性別</td>
                <td>手機</td>
                <td>生日</td>
                <td>e-mail</td>
                <td style='width: 75px'>身份</td>
                <td style='width: 80px'>狀態</td>
                <td>點數</td>
            </tr>

    ";

    
    $sql =  "SELECT * FROM CUSTOMER WHERE CUS_ID= '1'";
    $member = $pdo->prepare($sql);
    $member -> execute();
    $customer = $member->fetchAll(PDO::FETCH_ASSOC);
    // echo json_encode($customer);
    foreach ($customer as $key => $value) {
        echo "<tr>";
        echo "<td>" . $value['CUS_LAST'] . "</td>";
        echo "<td>" . $value['CUS_FIRST'] . "</td>";
        echo "<td>" . $value['CUS_GEN'] . "</td>";
        echo "<td>" . $value['CUS_PHONE'] . "</td>";
        echo "<td>" . $value['CUS_BIRTH'] . "</td>"; 
        echo "<td>" . $value['CUS_EMAIL'] . "</td>";
        echo "<td class='cusIdTd'>" . $value['CUS_ID'] . "</td>";
        echo "<td class='cusStateTd'>" . $value['CUS_STATE'] . "</td>";
        echo "<td>" . $value['CUS_POINT'] . "</td>";
        echo "</tr>";
    }
}

// if ($conn->connect_error) {
//     die("連接失敗" . $conn->connect_error);
// }
// mysqli_query($conn, "SET NAMES 'UTF-8'");





// // 表頭
// echo "
// <table>
//     <tr>
//         <td>姓</td>
//         <td>名</td>
//         <td>性別</td>
//         <td>手機</td>
//         <td>生日</td>
//         <td>e-mail</td>
//         <td>身份</td>
//         <td>狀態</td>
//         <td>點數</td>
//     </tr>

// ";

// if (isset($_GET['s'])) {
//     $s = mysqli_real_escape_string($conn , $_GET['s']);
//     $sql =  "SELECT * FROM CUSTOMER WHERE CUS_LAST LIKE '%" . $s . "%' OR CUS_FIRST LIKE '%" . $s . "%' OR CUS_PHONE LIKE '%" . $s . "%'";
//     $result = $conn->query($sql);
//     // 搜尋錯誤訊息
//     if(!$result) {
//           echo ("錯誤 : " . mysqli_error($conn));
//           exit();
//     }
//     //查無資料
//     if (mysqli_num_rows($result) <= 0) {
//         echo "<tr><td colspan='9'>查無資料</td></tr>";
//     }
//     //查到資料時
//     while ($row = mysqli_fetch_array($result)) {

        // echo "<tr>";
        // echo "<td>" . $row['CUS_LAST'] . "</td>";
        // echo "<td>" . $row['CUS_FIRST'] . "</td>";
        // echo "<td>" . $row['CUS_GEN'] . "</td>";
        // echo "<td>" . $row['CUS_PHONE'] . "</td>";
        // echo "<td>" . $row['CUS_BIRTH'] . "</td>"; 
        // echo "<td>" . $row['CUS_EMAIL'] . "</td>";
        // echo "<td>" . $row['CUS_ID'] . "</td>";
        // echo "<td>" . $row['CUS_STATE'] . "</td>";
        // echo "<td>" . $row['CUS_POINT'] . "</td>";
        // echo "</tr>";
        
//     }
// } else {
//     // 如果沒有文字顯示的資料
//     $sql = "SELECT * FROM CUSTOMER";
//     $result = mysqli_query($conn, $sql);

//     if (!$result) {
//         echo ("錯誤：" . mysqli_error($conn));
//         exit();
//     }

//     while ($row = mysqli_fetch_array($result)) {
//         echo "<tr>";
//         echo "<td>" . $row['CUS_LAST'] . "</td>";
//         echo "<td>" . $row['CUS_FIRST'] . "</td>";
//         echo "<td>" . $row['CUS_GEN'] . "</td>";
//         echo "<td>" . $row['CUS_PHONE'] . "</td>";
//         echo "<td>" . $row['CUS_BIRTH'] . "</td>";
//         echo "<td>" . $row['CUS_EMAIL'] . "</td>";
//         echo "<td>" . $row['CUS_ID'] . "</td>";
//         echo "<td>" . $row['CUS_STATE'] . "</td>";
//         echo "<td>" . $row['CUS_POINT'] . "</td>";
//         echo "</tr>";
//     }
// }

// echo "</table>";
// $conn->close();
?>