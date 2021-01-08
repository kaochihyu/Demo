<?php 
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $content = $_POST['content'];

  if (empty($content)) {
    header('Location: ./index.php?errCode=1');
    die('資料不齊全');
  }

  $username = $_SESSION['username'];

  $sql = "INSERT INTO kaochihyu_comments(username, content) VALUES(?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $username, $content);
  $result = $stmt->execute();

  if ($result) {
    header('Location: ./index.php');
  } else {
    die('failed:' . $conn->error);
  }
 ?>
 