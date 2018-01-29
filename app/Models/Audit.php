<?php

namespace Pedidos\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Audit extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
        'type',
        'user_id',
        'user',
        'entity',
        'action'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
