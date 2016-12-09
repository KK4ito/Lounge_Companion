<?php

/**
 * Created by PhpStorm.
 * User: Matth
 * Date: 09.12.2016
 * Time: 14:52
 */
class DrinksMapper
{
    public $database;

    function __construct($db)
    {
        $this->database = $db;
    }
    function getDrinks(){
        $selection = $this->database->prepare('SELECT * FROM webec.drinks');
        $selection->execute();
        $results = $selection->fetchAll();
        return $results;
    }
}