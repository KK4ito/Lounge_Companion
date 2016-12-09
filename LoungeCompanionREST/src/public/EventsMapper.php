<?php

/**
 * Created by PhpStorm.
 * User: Matth
 * Date: 09.12.2016
 * Time: 14:52
 */
class EventsMapper
{
    public $database;

    function __construct($db)
    {
        $this->database = $db;
    }
    function getEvents(){
        $selection = $this->database->prepare('SELECT * FROM webec.events');
        $selection->execute();
        $results = $selection->fetchAll();
        return $results;
    }
}