<?php
error_reporting(0);

$path = './count.dat';

session_start();
echo counter();

function counter() {
  global $path;
  $count = file_get_contents($path);

  if ($count === false || strpos($count, "\n") === false) {
    if (file_exists($path)) {
      return "ERROR!";
    }

    $count = 1;
    writeCount($count);
    chmod($path, 0606);

  } else {
    $count = intval(trim($count));
    if (!isset($_SESSION['access'])) {
      $_SESSION['access'] = 1;
      $count++;
      writeCount($count);
    }
  }

  return $count;
}

function writeCount(int $count) {
  global $path;
  file_put_contents($path, $count."\n", LOCK_EX);
}
