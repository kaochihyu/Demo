<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }
  
  //權限檢查，記得加 exit
  if ($user === NULL || $user['role'] !== 'ADMIN') {
    header('Location: index.php');
    exit;
  };
  
  //設定每頁數量
  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }

  $items_per_page = 10;
  $offset = ($page - 1) * $items_per_page;

  $stmt = $conn->prepare(
    "SELECT id, role, nickname, username FROM kaochihyu_users ORDER BY id ASC"
  );

  $result = $stmt->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }
  $result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>留言板管理後台</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./style.css">
  <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>
  <main class="admin_board">
    <div class="board_top">
        <div class="buttons">
          <a class="change_page_btn" href="./index.php">留言板</a>
      <?php if (!$username) { ?>
      <a class="change_page_btn" href="./login.php">登入</a>
      <?php } else { ?>
      <a class="change_page_btn" href="./logout.php">登出</a>
      <?php } ?>
        </div>
        <h1 class="board_title">留言板管理後台</h1>
      </div>
    <section class="comments">
      <table class="admin_comments">
        <tr>
          <th>id</th>
          <th>role</th>
          <th>nickname</th>
          <th>username</th>
          <th>調整身分</th>
        </tr>
        <?php 
            while($row = $result->fetch_assoc()) {
        ?>
          <tr>
            <td><?php echo escape($row['id']); ?> </td>
            <td>
              <?php if ($row['role'] === 'ADMIN') { ?>
              管理員
              <?php } ?>
              <?php if ($row['role'] === 'NORMAL') { ?>
              使用者
              <?php } ?>
              <?php if ($row['role'] === 'BANNED') { ?>
              停權者
              <?php } ?>
            </td>
            <td><?php echo escape($row['nickname']); ?></td>
            <td><?php echo escape($row['username']); ?></td>
            <td>
              <a class="update_comment" href="handle_update_role.php?role=ADMIN&id=<?php echo $row['id']; ?>">管理員</a>
              <a class="update_comment" href="handle_update_role.php?role=NORMAL&id=<?php echo $row['id']; ?>">使用者</a>
              <a class="update_comment" href="handle_update_role.php?role=BANNED&id=<?php echo $row['id']; ?>">停權者</a>
            </td>
          </tr>
        <?php } ?>
      </table>
    </section>
  </main>
  <script>
  </script>
</body>
</html>
