<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/auth/reset-password', function (Request $request) {
    $frontendUrl = rtrim((string) config('services.frontend.url'), '/');
    $appUrl = rtrim((string) config('app.url'), '/');

    abort_if($frontendUrl === '' || $frontendUrl === $appUrl, 404);

    return redirect()->away($frontendUrl.'/auth/reset-password?'.http_build_query($request->only(['token', 'email'])));
});
