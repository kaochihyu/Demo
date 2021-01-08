<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  //網址列取 id
  $id = $_GET['id'];

  //確認 cookie 裡面有沒有東西
  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  };

  $sql = "SELECT * FROM kaochihyu_comments WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  };
  
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  if (!hasPermission($user, 'update', $row)) {
    header('Location: index.php');
  };
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
  <header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>
  <main class="board">
    <h1 class="board_title">編輯留言</h1>
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
    <form class="board_new_comment" method="POST" action="./handle_update_comment.php">
      <h3>你好！<?php echo escape($user['username']); ?></h3>
      <textarea class="comments_area" name="content" rows="3"><?php echo $row['content']; ?></textarea>
      <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
      <input class="board_submit_btn" type="submit" />
    </form>
    <div class="board_line"></div>
  </main>
  <script>

  </script>
</body>
</html>
