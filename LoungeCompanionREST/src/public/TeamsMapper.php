<?php

/**
 * Created by PhpStorm.
 * User: Matth
 * Date: 09.12.2016
 * Time: 14:52
 */
class TeamsMapper
{
    public $database;

    function __construct($db)
    {
        $this->database = $db;
    }
    function getTeams(){
        $selection = $this->database->prepare('SELECT * FROM webec.teams');
        $selection->execute();
        $results = $selection->fetchAll();
        return $results;
    }
}