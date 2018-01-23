<?php

namespace Pedidos\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Caixa extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'caixa';
    protected $fillable = [
        'name',
        'ativo',
        'saldo'
    ];

    public function movimentoCaixa()
    {
        return $this->hasMany(MovimentoCaixa::class);
    }

}
