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
        Schema::create('enrollment', function (Blueprint $table) {
            $table->id();

            $table->foreignId('student_id')->constrained(
                'students', 'id'
            )->onDelete('cascade');
            
            $table->foreignId('grade_level_id')->constrained(
                'grade_level', 'id'
            )->onDelete('cascade');
            
            $table->foreignId('section_id')->constrained(
                'sections', 'id'
            )->onDelete('cascade');

            $table->integer('school_year');
            $table->date('enrollment_date');
            $table->string('status', 100);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrollment');
    }
};
