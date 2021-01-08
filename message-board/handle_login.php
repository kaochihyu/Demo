<?php 
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $username = $_POST['username'];
  $password = $_POST['password'];

  if (empty($username) || empty($password)) {
    header('Location: ./login.php?errCode=1');
    die('empty data');
  }

  // 從資料庫找到包含 username 跟 password 的資料
  $sql = "SELECT * FROM kaochihyu_users WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  //原本 query 執行有結果，現在沒有所以要把結果拿回來
  $result = $stmt->get_result();
  if ($result->num_rows === 0) {
    header('Location: ./login.php?errCode=2');
    exit();//記得要加，下面程式碼才不會被執行
  }

  //有查到使用者
  $row = $result->fetch_assoc();
  print_r($row);
  print_r($password);
  if (password_verify($password, $row['password'])) {
    $_SESSION['username'] = $username;
    header('Location: ./index.php');
  } else {
    header('Location: ./login.php?errCode=2');
  }
?>
