<?php

use App\Models\Clinic;
use App\Models\Doctor;
use App\Models\Treatment;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->time('time');
            $table->time('duration');
            //// as the patient is booking, it should not have a title and description
            $table->string('title');
            $table->text('description')->nullable();
            ////
            $table->enum('status', ['C', 'UC', 'A'])->default('UC');//Copmleted , UpComing , cAnceled
            $table->foreignId('clinic_id')->constrained()->onDelete('cascade');
            $table->foreignId('treatment_id')->constrained()->onDelete('cascade');
            $table->foreignId('doctor_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('appointments');
    }
};
