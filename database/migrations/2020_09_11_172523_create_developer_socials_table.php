<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDeveloperSocialsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('developer_socials', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('social_name');
            $table->string('font');
            $table->string('url');
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
        Schema::dropIfExists('developer_socials');
    }
}
