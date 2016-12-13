<?php


//Class which sets up the SQL-statements for the drinkcategories
class DrinkcategoriesMapper
{
    public $database;

    function __construct($db)
    {
        $this->database = $db;
    }
    function getDrinkCategories(){
        $selection = $this->database->prepare('SELECT * FROM webec.drinkcategories');
        $this->database->beginTransaction();
        $success = $selection->execute();
        if ($success) {
            $results = $selection->fetchAll();
        } else {
            $results = '';
        }
        return $results;
    }
    function createDrinkCategory($drinkcategory)
    {
        $insertion = $this->database->prepare('INSERT INTO webec.drinkcategories(name) VALUES(:name)');
        $insertion->bindParam(':name', $drinkcategory['name']);
        $selection = $this->database->prepare('SELECT id FROM webec.drinkcategories WHERE (name=:name )');
        $selection->bindParam(':name', $drinkcategory['name']);
        $this->database->beginTransaction();
        $successInsert = $insertion->execute();
        if ($successInsert) {
            $successSelect = $selection->execute();
            if ($successSelect) {
                $this->database->commit();
                $result = $selection->fetch();
                return $result;
            } else {
                $this->database->rollback();
                $result = '';
            }
        } else {
            $this->database->rollback();
            $result = '';
        }
        return $result["id"];
    }
    function deleteDrinkCategory($id)
    {
        $deletion = $this->database->prepare('DELETE FROM webec.drinkcategories WHERE id=:id');
        $deletion->bindParam(':id', $id);
        $this->database->beginTransaction();
        $success = $deletion->execute();
        if ($success) {
            $this->database->commit();
            return true;
        } else return false;
    }
}