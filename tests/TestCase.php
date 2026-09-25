<?php

namespace Tests;

use Illuminate\Contracts\Console\Kernel;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    public function createApplication()
    {
        $app = require Application::inferBasePath().'/bootstrap/app.php';

        $app->make(Kernel::class)->bootstrap();

        // Blindaje: los tests solo tocan nidoquest_testing aunque el entorno
        // traiga DB_* de desarrollo (phpunit.xml no basta dentro de docker,
        // donde las variables reales tienen prioridad sobre el .env).
        config(['database.connections.pgsql.database' => 'nidoquest_testing']);

        return $app;
    }
}
