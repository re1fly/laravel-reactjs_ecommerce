<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transactions extends Model
{
    use SoftDeletes;

    protected $table = "transactions";
    protected $fillable = ['order_id','customer_id','item_customer', 'shipping_address', 'payment_method', 'price'];
}
