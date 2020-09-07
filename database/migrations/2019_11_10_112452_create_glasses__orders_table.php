<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGlassesOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('glasses__orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('glasses_id');
            $table->unsignedBigInteger('order_id');
            $table->integer('quantity');

            $table->foreign('glasses_id')
                  ->references('id')->on('glasses')
                  ->onDelete('cascade');

            $table->foreign('order_id')
                  ->references('id')->on('orders')
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
        Schema::dropIfExists('glasses__orders');
    }
}
