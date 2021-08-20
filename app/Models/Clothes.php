<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Clothes extends Model
{
    use SoftDeletes;

    protected $table = "clothes";
    protected $fillable = ['category', 'sub_category', 'gender', 'product_name', 'product_image', 'price'];
}
