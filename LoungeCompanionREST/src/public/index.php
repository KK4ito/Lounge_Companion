<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '/vendor/autoload.php';
spl_autoload_register(function ($class_name) {
    include $class_name . '.php';
});

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$config['db']['host']   = "localhost";
$config['db']['user']   = "root";
$config['db']['pass']   = "";
$config['db']['dbname'] = "webec";


$app = new \Slim\App(["settings" => $config]);
spl_autoload("EventsMapper");
spl_autoload("DrinksMapper");
spl_autoload("DrinkcategoriesMapper");
spl_autoload("TeamsMapper");


$container = $app->getContainer();
$container['logger'] = function($c) {
    $logger = new \Monolog\Logger('my_logger');
    $file_handler = new \Monolog\Handler\StreamHandler("/logs/app.log");
    $logger->pushHandler($file_handler);
    return $logger;
};

$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $pdo = new PDO("mysql:host=" . $db['host'] . ";dbname=" . $db['dbname'],
        $db['user'], $db['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};



$app->get('/events', function (Request $request, Response $response) {
    $mapper = new EventsMapper($this->db);
    $events = $mapper->getEvents();
    $response->getBody()->write(json_encode($events),true);
    return $response;
});

$app->get('/teams', function (Request $request, Response $response) {
    $mapper = new TeamsMapper($this->db);
    $teams = $mapper->getTeams();
    $response->getBody()->write(json_encode($teams),true);
    return $response;
});

$app->get('/drinks', function (Request $request, Response $response) {
    $mapper = new DrinksMapper($this->db);
    $drinks = $mapper->getDrinks();
    $response->getBody()->write(json_encode($drinks),true);
    return $response;
});

$app->get('/drinkcategories', function (Request $request, Response $response) {
    $mapper = new DrinkcategoriesMapper($this->db);
    $drinkcategories = $mapper->getDrinkCategories();
    $response->getBody()->write(json_encode($drinkcategories),true);
    return $response;
});




$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");
    $this->logger->addInfo("Response generated.");

    return $response;
});
$app->run();