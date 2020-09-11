<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDeveloperSkillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('developer__skills', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('skill');
            $table->string('experience_ar');
            $table->string('experience_en');
            $table->unsignedBigInteger('developer_id');

            $table->foreign('developer_id')
                  ->references('id')->on('developers')
                  ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('developer__skills');
    }
}
