<?php

namespace Pedidos\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Product extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
        'category_id',
        'name',
        'description',
        'price',
        'subgroup_id',
        'status'
    ];

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function subgroup(){
        return $this->belongsTo(Subgroup::class);
    }
}
