<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../../vendor/autoload.php';
spl_autoload_register(function ($class_name) {
    include $class_name . '.php';
});

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$config['db']['host']   = "64.137.190.213";
$config['db']['user']   = "root";
$config['db']['pass']   = "webec_2016";
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
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
	    ->withHeader('Content-Type', 'application/json')
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});


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



$app->post('/events', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $event['name'] = filter_var($data['name'], FILTER_SANITIZE_STRING);
    $event['start'] = filter_var($data['start'], FILTER_SANITIZE_STRING);
    $event['end'] = filter_var($data['end'], FILTER_SANITIZE_STRING);
    $event['description'] = filter_var($data['description'], FILTER_SANITIZE_STRING);
    $mapper = new EventsMapper($this->db);
    $eventID =$mapper->createEvent($event);
    $response->getBody()->write(json_encode($eventID),true);
    return $response;
});

$app->post('/teams', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $team['name'] = filter_var($data['name'], FILTER_SANITIZE_STRING);
    $team['code'] = filter_var($data['code'], FILTER_SANITIZE_STRING);
    $mapper = new TeamsMapper($this->db);
    $teamID =$mapper->createteam($team);
    $response->getBody()->write(json_encode($teamID),true);
    return $response;
});

$app->post('/drinks', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $drink['name'] = filter_var($data['name'], FILTER_SANITIZE_STRING);
    $drink['size'] = filter_var($data['size'], FILTER_SANITIZE_STRING);
    $drink['price'] = filter_var($data['price'], FILTER_SANITIZE_STRING);
    $drink['categoryid'] = filter_var($data['categoryid'], FILTER_SANITIZE_STRING);
    $mapper = new DrinksMapper($this->db);
    $drinkID =$mapper->createdrink($drink);
    $response->getBody()->write(json_encode($drinkID),true);
    return $response;
});

$app->post('/drinkcategories', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $drinkcategory['name'] = filter_var($data['name'], FILTER_SANITIZE_STRING);
    $mapper = new DrinkcategoriesMapper($this->db);
    $drinkcategoryID =$mapper->createDrinkCategory($drinkcategory);
    $response->getBody()->write(json_encode($drinkcategoryID),true);
    return $response;
});




$app->delete('/events/{id}', function (Request $request,Response $response) {
    $id = $request->getAttribute('id');
    $mapper = new EventsMapper($this->db);
    $result = $mapper->deleteEvent($id);
    $response->getBody()->write(json_encode($result),true);
    return $response;
});

$app->delete('/teams/{id}', function (Request $request,Response $response) {
    $id = $request->getAttribute('id');
    $mapper = new TeamsMapper($this->db);
    $result = $mapper->deleteTeam($id);
    $response->getBody()->write(json_encode($result),true);
    return $response;
});
$app->delete('/drinks/{id}', function (Request $request,Response $response) {
    $id = $request->getAttribute('id');
    $mapper = new DrinksMapper($this->db);
    $result = $mapper->deleteDrink($id);
    $response->getBody()->write(json_encode($result),true);
    return $response;
});
$app->delete('/drinkcategories/{id}', function (Request $request,Response $response) {
    $id = $request->getAttribute('id');
    $mapper = new DrinkcategoriesMapper($this->db);
    $result = $mapper->deleteDrinkCategory($id);
    $response->getBody()->write(json_encode($result),true);
    return $response;
});

$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");
    $this->logger->addInfo("Response generated.");

    return $response;
});
$app->run();
