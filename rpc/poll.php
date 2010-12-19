<?php

$poll = $_REQUEST['poll'];
$vote = $_REQUEST['vote'];

if(!file_exists("polls")) {
  mkdir("polls");
}

$pollFile = fopen("polls/$poll", "a");
fwrite($pollFile, "$vote\n");
fclose($pollFile);

?>