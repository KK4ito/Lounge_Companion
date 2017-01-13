<?php


//Class which sets up the SQL-statements for the events
class EventsMapper
{
    public $database;

    function __construct($db)
    {
        $this->database = $db;
    }

    // Handles GET method and returns all events
    function getEvents()
    {
        $selection = $this->database->prepare('SELECT * FROM webec.events');
        $this->database->beginTransaction();
        $success = $selection->execute();
        if ($success) {
            $results = $selection->fetchAll();
        } else {
            $results = 'failed to fetch events from database';
        }
        return $results;
    }

    //creates a new event from the body of the POST request
    function createEvent($event)
    {
        $insertion = $this->database->prepare('INSERT INTO webec.events(name, start, end, description) VALUES(:name, :start,:end,:description)');
        $insertion->bindParam(':name', $event['name']);
        $insertion->bindParam(':start', $event['start']);
        $insertion->bindParam(':end', $event['end']);
        $insertion->bindParam(':description', $event['description']);
        $selection = $this->database->prepare('SELECT id FROM webec.events WHERE (name=:name AND start=:start) AND (end=:end AND description=:description)');
        $selection->bindParam(':name', $event['name']);
        $selection->bindParam(':start', $event['start']);
        $selection->bindParam(':end', $event['end']);
        $selection->bindParam(':description', $event['description']);
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
                $result = 'failed to create event ';
            }
        } else {
            $this->database->rollback();
            $result = 'failed to create event';
        }
        return $result["id"];
    }

    // deletes the event with the chosen ID
    function deleteEvent($id)
    {
        $deletion = $this->database->prepare('DELETE FROM webec.events WHERE id=:id');
        $deletion->bindParam(':id', $id);
        $this->database->beginTransaction();
        $success = $deletion->execute();
        if ($success) {
            $this->database->commit();
            return true;
        } else return false;
    }
}