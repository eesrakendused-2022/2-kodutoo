<?php
    // if(isset($_POST["save"]) && !empty($_POST["save"])){
    //     saveToFile($_POST["save"]);
    // }
    // saveToFile("aboba");
    // function saveToFile($stringToSave){
    //     $object = new StdClass();
    //     $object->last_modified = time();
    //     $object->content = $stringToSave;
    //     $jsonString = json_encode($object);
    //     file_put_contents("database.txt", $jsonString);
    // }
    
    if(isset($_POST["high_score"]) && !empty($_POST["high_score"])){
        file_get_contents("test.txt", "1234");
    }



?>