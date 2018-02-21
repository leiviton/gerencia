<?php

namespace Pedidos\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Caixa extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'caixas';
    protected $fillable = [
        'name',
        'ativo',
        'saldo',
        'open_close'
    ];

    public function movimentoCaixa()
    {
        return $this->hasMany(MovimentoCaixa::class);
    }
}
