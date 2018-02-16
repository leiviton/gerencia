<?php

namespace Pedidos\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class OpenCloseCaixas extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'open_close_caixas';

    protected $fillable = [
        'tipo',
        'usuario',
        'saldo',
        'caixa_id'
    ];

    public function caixa()
    {
        return $this->belongsTo(Caixa::class);
    }


}
