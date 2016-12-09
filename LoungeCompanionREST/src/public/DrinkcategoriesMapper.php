<?php

/**
 * Created by PhpStorm.
 * User: Matth
 * Date: 09.12.2016
 * Time: 14:52
 */
class DrinkcategoriesMapper
{
    public $database;

    function __construct($db)
    {
        $this->database = $db;
    }
    function getDrinkCategories(){
        $selection = $this->database->prepare('SELECT * FROM webec.drinkcategories');
        $selection->execute();
        $results = $selection->fetchAll();
        return $results;
    }
}