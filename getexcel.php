<?php
require_once '/phpexcel/PHPExcel.php';
require_once '/phpexcel/PHPExcel/Writer/Excel2007.php';
require_once '/phpexcel/PHPExcel/Writer/Excel5.php';
include_once '/phpexcel/PHPExcel/IOFactory.php';

/*
    字符串GBK转码为UTF-8，数字转换为数字。
*/
function ct2($s){
    if(is_numeric($s)) {
        return intval($s);
    } else {
        return iconv("GBK","UTF-8",$s);
    }
}
/*
    批量处理gbk->utf-8
*/
function icon_to_utf8($s) {
  if(is_array($s)) {
    foreach($s as $key => $val) {
      $s[$key] = icon_to_utf8($val);
    }
  } else {
      $s = ct2($s);
  }
  return $s;
}

$fileName = "AirData";
getExcel($fileName);
 
  
function getExcel($fileName){
    $date = date('Y-m-d h:i:s',time());
    $fileName .= "_{$date}.xls";
    $filename1 = "data.json";//bug : if you use "/data.json", you cannnot open this file . you need to use "data.json"
    $json_string = file_get_contents($filename1);
    //$json2_string = icon_to_utf8($json_string); 
    $obj=json_decode($json_string,true); 
    $objPHPExcel = new PHPExcel();
    $objProps = $objPHPExcel->getProperties();
$baseRow = 1;      
foreach($obj as $r => $dataRow) {
      $row = $baseRow + $r;    
      $objPHPExcel->getActiveSheet()->insertNewRowBefore($row,1);   
      $objPHPExcel->getActiveSheet()->setCellValue( 'A'.$row, $dataRow['city']);
      $objPHPExcel->getActiveSheet()->setCellValue( 'B'.$row, $dataRow['api']);
      $objPHPExcel->getActiveSheet()->setCellValue( 'C'.$row, $dataRow['state']);
      $objPHPExcel->getActiveSheet()->setCellValue( 'D'.$row, $dataRow['pm25']);
      $objPHPExcel->getActiveSheet()->setCellValue( 'E'.$row, $dataRow['pm10']);
      $objPHPExcel->getActiveSheet()->setCellValue( 'F'.$row, $dataRow['co']);
      $objPHPExcel->getActiveSheet()->setCellValue( 'G'.$row, $dataRow['no2']);
            $objPHPExcel->getActiveSheet()->setCellValue( 'H'.$row, $dataRow['o3']);
      }
    $objPHPExcel->getActiveSheet()->setTitle('Simple');
    $objPHPExcel->setActiveSheetIndex(0);
    
//将输出重定向到一个客户端web浏览器(Excel2007)
          header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          header("Content-Disposition: attachment; filename=\"$fileName\"");
          header('Cache-Control: max-age=0');
          $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
          $objWriter->save('php://output'); //文件通过浏览器下载
  exit;
  
}