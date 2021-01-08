<?php 
//用 username 去取 user
  require_once('./conn.php');
  function getUserFromUsername($username) {
    global $conn;
    $sql = "SELECT * FROM kaochihyu_users WHERE username = '$username'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row;
  }

  //防 xss
  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  //判斷身分 action: update、delete、create
  function hasPermission($user, $action, $comment) {
    if ($user['role'] === "ADMIN") {
      return true;
    }

    if ($user["role"] === "NORMAL") {
      if ($action === 'create') return true; // 區分一般使用者跟停權者
      return $comment["username"] === $user["username"];
    }

    if ($user["role"] === "BANNED") {
      return $action !== 'create';
    }
  }

  //單獨判斷管理員身分
  function isAdmin($user) {
    return $user["role"] === "ADMIN";
  } 
?>
