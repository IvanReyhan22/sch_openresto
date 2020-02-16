<?php

Route::view('/{path?}', 'app')
     ->where('path', '.*')
     ->name('app');
