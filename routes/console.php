<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('nidoquest:hello', function (): void {
    $this->info('NidoQuest backend ready.');
});
