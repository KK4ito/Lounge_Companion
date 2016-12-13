<?php


//Class which sets up the SQL-statements for the drinks
class DrinksMapper
{
    public $database;

    function __construct($db)
    {
        $this->database = $db;
    }

    function getDrinks()
    {
        $selection = $this->database->prepare('SELECT * FROM webec.drinks');
        $this->database->beginTransaction();
        $success = $selection->execute();
        if ($success) {
            $results = $selection->fetchAll();
        } else {
            $results = '';
        }
        return $results;
    }

    function createDrink($drink)
    {
        $insertion = $this->database->prepare('INSERT INTO webec.drinks(name, size, price, categoryid) VALUES(:name, :size, :price, :categoryid)');
        $insertion->bindParam(':name', $drink['name']);
        $insertion->bindParam(':size', $drink['size']);
        $insertion->bindParam(':price', $drink['price']);
        $insertion->bindParam(':categoryid', $drink['categoryid']);
        $selection = $this->database->prepare('SELECT id FROM webec.drinks WHERE (name=:name AND categoryid=:categoryid)AND (size=:size AND price=:price)');
        $selection->bindParam(':name', $drink['name']);
        $selection->bindParam(':size', $drink['size']);;
        $selection->bindParam(':price', $drink['price']);
        $selection->bindParam(':categoryid', $drink['categoryid']);
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
    function deleteDrink($id)
    {
        $deletion = $this->database->prepare('DELETE FROM webec.drinks WHERE id=:id');
        $deletion->bindParam(':id', $id);
        $this->database->beginTransaction();
        $success = $deletion->execute();
        if ($success) {
            $this->database->commit();
            return true;
        } else return false;
    }
}