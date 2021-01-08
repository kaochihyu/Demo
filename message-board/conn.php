<?php 
  $server_name = 'localhost';
  $username = 'chihyu';
  $password = 'chihyu';
  $db_name = 'chihyu';

  $conn = new mysqli($server_name, $username, $password, $db_name);

  if ($conn->connect_error) {
    die('資料連線錯誤:' . $conn->connect_error);
  } 

  $conn->query('SET NAMES UTF8');
  $conn->query('SET time_zone = "+8:00"');
?>
