<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');
  //確認 cookie 裡面有沒有東西
  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  //設定每頁數量
  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }

  $items_per_page = 5;
  $offset = ($page - 1) * $items_per_page;

  $stmt = $conn->prepare(
    'SELECT ' .
    'C.id as id, C.content as content, ' .
    'C.created_at as created_at, U.nickname as nickname, U.username as username ' .
    'FROM kaochihyu_comments as C ' .
    'LEFT JOIN kaochihyu_users as U ON C.username = U.username ' . 
    'WHERE C.is_deleted is NULL ' .
    'ORDER BY C.id DESC ' .
    'LIMIT ? OFFSET ? '
  );

  $stmt->bind_param('ii', $items_per_page, $offset);
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
  <title>留言板</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./style.css">
  <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <header id="top" class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>
  <main class="board">
    <div class="board_top">
      <div class="buttons">
        <?php if (!$username) { ?>
          <a class="change_page_btn" href="./register.php">註冊</a>
          <a class="change_page_btn" href="./login.php">登入</a>
        <?php } else { ?>
          <a class="change_page_btn" href="./logout.php">登出</a>
          <span class="update_nickname">編輯暱稱</span>
        <?php } ?>
        <?php if ($user && $user['role'] === 'ADMIN') { ?>
          <a class="change_page_btn" href="./admin.php">管理後台</a>  
        <?php } ?>
      </div>   
      <h1 class="board_title">Comments</h1>
    </div>
    <?php 
      if (!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        $msg = 'Error';
        if ($code === '1') {
          $msg = '資料不齊全';
        }
        echo '<h3 class="error">' . $msg . '</h3>';
      }
    ?>
    <form class="hide board_nickname_form" method="POST" action="handle_update_user.php">
      <div class="nickname">
        <span>新的暱稱:</span>
        <input type="text" name="nickname" />
      </div>
      <input class="update_user_btn" type="submit" value="更改暱稱" />
    </form>
    <form class="board_new_comment" method="POST" action="./handle_add_comment.php">
      <h3>你好！<?php echo escape($user['username']); ?></h3>
      <div>
        <textarea class="comments_area" name="content" rows="3"></textarea>
        <?php if ($username && !hasPermission($user, 'create', NULL)) { ?>
          <h3>你已被停權</h3>
        <?php } else if ($username) { ?>
          <input class="board_submit_btn" type="submit" />
        <?php } else { ?>
          <h3>請登入發布留言！</h3>
        <?php } ?>
      </div>
    </form>
    <div class="board_line"></div>
    <section class="comments">
      <?php 
        while($row = $result->fetch_assoc()) {
      ?>
        <div class="card">
          <div class="card_avatar"></div>
          <div class="card_body">
            <div class="card_info">
              <span class="card_author"><?php echo escape($row['nickname']); ?>
              (@ <?php echo escape($row['username']); ?> )</span>
              <span class="card_time"><?php echo escape($row['created_at']); ?></span>
              <?php if (hasPermission($user, 'update', $row)) { ?>
                <a class="update_comment" href="update_comment.php?id=<?php echo $row['id']; ?>"> 編輯</a>
                <a class="update_comment" href="delete_comment.php?id=<?php echo $row['id']; ?>"> 刪除</a>
              <?php }; ?>
              <div class="card_content"><?php echo escape($row['content']); ?></div>
            </div>
          </div>
        </div>
      <?php } ?>
    </section>
    <div class="board_line"></div>
    <?php 
      $stmt = $conn->prepare(
        'SELECT count(id) AS count FROM kaochihyu_comments WHERE is_deleted IS NULL'
      );

      $result = $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $count = $row['count'];
      $total_page = ceil($count / $items_per_page);
    ?>
    <div class="page_info">
      <span>總共有 <?php echo $count; ?> 筆留言，頁數：</span>
      <span><?php echo $page; ?> / <?php echo $total_page; ?></span>
    </div>
    <div class="paginator">
      <?php if ($page != 1) {; ?>
        <a href="index.php?page=1">首頁</a>
        <a href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
      <?php }; ?>
      <?php if ($page != $total_page) {; ?>
        <a href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
        <a href="index.php?page=<?php echo $total_page; ?>">最後頁</a>
      <?php }; ?> 
    </div>
  </main>
  <a class="top_button" href="#top">^</a>
  <script>
    var btn = document.querySelector('.update_nickname').addEventListener('click', function() {
      var form = document.querySelector('.board_nickname_form');
      form.classList.toggle('hide');
    })
  </script>
</body>
</html>
