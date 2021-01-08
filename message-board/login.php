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
  <main class="board board_login">
    <div class="board_top">
      <div class="buttons">
        <a class="change_page_btn" href="./index.php">回留言板</a>
        <a class="change_page_btn" href="./register.php">註冊</a>
      </div>
      <h1 class="board_title">登入</h1>
    </div>
    <?php 
      if (!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        $msg = 'Error';
        if ($code === '1') {
          $msg = '資料不齊全';
        }

        if ($code === '2') {
          $msg = '帳號密碼有誤';
        }
        echo '<h3 class="error">' . $msg . '</h3>';
      }
    ?>
    <form class="board_new_comment" method="POST" action="./handle_login.php">
      <div>
        <div class="nickname">
          <span>帳號:</span>
          <input type="text" name="username" />
        </div>
        <div class="nickname">
          <span>密碼:</span>
          <input type="password" name="password" />
        </div>
      </div>
      <input class="login_submit_btn" type="submit" />
    </form>
  </main>
</body>
</html>
