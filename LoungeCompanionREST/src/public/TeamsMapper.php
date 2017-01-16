<?php


//Class which sets up the SQL-statements for the teams
class TeamsMapper
{
    public $database;

    function __construct($db)
    {
        $this->database = $db;
    }

    // Handles GET Method and returns all teams
    function getTeams()
    {
        $selection = $this->database->prepare('SELECT * FROM webec.teams');
        $this->database->beginTransaction();
        $success = $selection->execute();
        if ($success) {
            $results = $selection->fetchAll();
        } else {
            $results = 'could not fetch teams from database';
        }
        return $results;
    }

    // creates a new Team from the body of the POST request
    function createTeam($team)
    {
        $insertion = $this->database->prepare('INSERT INTO webec.teams(name, code) VALUES(:name,:code)');
        $insertion->bindParam(':name', $team['name']);
        $insertion->bindParam(':code', $team['code']);
        $selection = $this->database->prepare('SELECT * FROM webec.teams WHERE (name=:name AND code=:code)');
        $selection->bindParam(':name', $team['name']);
        $selection->bindParam(':code', $team['code']);
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
                $result = 'could not create team';
            }
        } else {
            $this->database->rollback();
            $result = 'could not create team';
        }
        return $result["id"];
    }

    function putTeam($id,$code){
        $update = $this->database->prepare('UPDATE webec.teams SET code=:code WHERE id=:id');
        $update->bindParam('code',$code);
        $update-> bindParam('id',$id);
        $this -> database->beginTrainsaction();
        $successUpdate = $update->execute();
        if($successUpdate){
            $this->database->commit();
            $result=$update->fetch();
            return $result;
        }else{
            $this->database->rollback();
            return = 'could not change code of team';
        }
    }

    // deletes the team with the chosen id
    function deleteTeam($id)
    {
        $deletion = $this->database->prepare('DELETE FROM webec.teams WHERE id=:id');
        $deletion->bindParam(':id', $id);
        $this->database->beginTransaction();
        $success = $deletion->execute();
        if ($success) {
            $this->database->commit();
            return true;
        } else return false;
    }
}
