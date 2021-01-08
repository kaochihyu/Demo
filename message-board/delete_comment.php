<?php 
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');


  if (empty($_GET['id'])) {
    header('Location: update_index.php?errCode=1');
    die('資料不齊全');
  }


  $id = $_GET['id'];
  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);

  if (isAdmin($user)) {
    $sql = "UPDATE kaochihyu_comments SET is_deleted=1 WHERE id=?";
  } else {
    $sql = "UPDATE kaochihyu_comments SET is_deleted=1 WHERE id=? AND username=?";
  };
  
  $stmt = $conn->prepare($sql);

  if (isAdmin($user)) {
    $stmt->bind_param('i', $id);
  } else {
    $stmt->bind_param('is', $id, $username);
  }
  
  $result = $stmt->execute();

  if ($result) {
    header('Location: ./index.php');
  } else {
    die('failed:' . $conn->error);
  }
?>
