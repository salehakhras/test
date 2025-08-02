<?php

use App\Models\Secretary;
use App\Models\WorkingHour;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('secretary_working_hour', function (Blueprint $table) {
            $table->foreignId('working_hour_id')->constrained()->onDelete('cascade');
            $table->foreignId('secretary_id')->constrained()->onDelete('cascade');
            $table->string('working_day');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('secretary_working_hour');
    }
};
