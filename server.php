<?php
    if(isset($_POST["save"]) && !empty($_POST["save"])){
        saveToFile($_POST["save"]);
    }

    function saveToFile($stringToSave){
        $object = new StdClass();
        $object->last_modified = time();
        $object->content = $stringToSave;
        $jsonString = json_encode($object);
        var_dump($jsonString);
        file_put_contents("db.txt", $jsonString.PHP_EOL, FILE_APPEND | LOCK_EX);
    }

?>