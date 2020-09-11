<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBranchPhonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('branch__phones', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('phone');
            $table->unsignedBigInteger('branch_id');

            $table->foreign('branch_id')
                  ->references('id')->on('branches')
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
        Schema::dropIfExists('branch__phones');
    }
}
