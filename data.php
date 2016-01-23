<?php
exec("python PythonApplication1.py");
//header('Content-type: application/json; charset=uft-8');
echo file_get_contents('data.json');
?>