<?php 
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);

  if (empty($_POST['content'])) {
    header('Location: update_comment.php?errCode=1&id='.$_POST['id']);
    die('資料不齊全');
  }

  //如果有 content ，取得 username
  $id = $_POST['id'];
  $content = $_POST['content'];
  
  if (isAdmin($user)) {
    $sql = "UPDATE kaochihyu_comments SET content=? WHERE id=?";
  } else {
    $sql = "UPDATE kaochihyu_comments SET content=? WHERE id=? AND username=?";
  }
  
  $stmt = $conn->prepare($sql);
  
  if (isAdmin($user)) {
    $stmt->bind_param('si', $content, $id);
  } else {
    $stmt->bind_param('sis', $content, $id, $username);
  }

  $result = $stmt->execute();

  if ($result) {
    header('Location: ./index.php');
  } else {
    die('failed:' . $conn->error);
  }
?>
