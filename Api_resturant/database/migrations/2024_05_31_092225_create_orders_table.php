<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id');
            $table->unsignedBigInteger('DiningTable_id');
            $table->integer('quantity');
            $table->double('total_cost');
            $table->foreign('customer_id')
            ->references('id')
            ->on('customers')->onDelete('cascade')
            ->onUpdate('cascade');
            $table->foreign('DiningTable_id')
            ->references('id')
            ->on('diningtables')
            ->onDelete('cascade')
            ->onUpdate('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
