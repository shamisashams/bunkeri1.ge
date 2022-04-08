<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'email',
        'city',
        'address',
        'info',
        'payment_method',
        'courier_service',
        'locale',
        'grand_total'
    ];


    public function items():HasMany{
        return $this->hasMany(OrderItem::class);
    }
}
