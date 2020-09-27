<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAboutSocialTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('about_social', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('font');
            $table->string('url');
            $table->unsignedBigInteger('about_id')->default(1);

            $table->foreign('about_id')
                  ->references('id')->on('abouts')
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
        Schema::dropIfExists('about_social');
    }
}
