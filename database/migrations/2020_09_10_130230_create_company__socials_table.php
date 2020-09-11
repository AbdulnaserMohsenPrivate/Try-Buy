<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompanySocialsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company__socials', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('font');
            $table->string('url');
            $table->unsignedBigInteger('abouts_id')->default(1);

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
        Schema::dropIfExists('company__socials');
    }
}
