<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGlassesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('glasses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name_ar');
            $table->string('name_en');
            $table->string('image');
            $table->string('model_ar');
            $table->string('model_en');
            $table->decimal('price');
            $table->string('searchImageMask');
            $table->decimal('offer_price')->nullable();
            $table->integer('height');
            $table->integer('width');
            $table->integer('sales')->default(0);
            $table->integer('rating')->default(0);
            $table->unsignedBigInteger('brand_id');
            
            $table->foreign('brand_id')
                  ->references('id')->on('brands')
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
        Schema::dropIfExists('glasses');
    }
}
