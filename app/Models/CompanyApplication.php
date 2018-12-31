<?php

namespace Pedidos\Models;

use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class CompanyApplication
 *
 * @property int $id
 * @property string $razao_social
 * @property string $nome_fantazia
 * @property string $cnpj
 * @property string $inscricao_estatual
 * @property string $endereco
 * @property string $numero
 * @property string $complemento
 * @property string $bairro
 * @property string $cidade
 * @property string $estado
 * @property string $telefone
 * @property string $whatsapp
 * @property string $site
 * @property string $responsavel
 * @property string $cpf_responsavel
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $orders
 *
 * @package Pedidos\Models
 */
class CompanyApplication extends Eloquent implements Transformable
{
    use TransformableTrait;
    
    protected $fillable = [
        'razao_social',
        'nome_fantazia',
        'cnpj',
        'inscricao_estatual',
        'endereco',
        'numero',
        'complemento',
        'bairro',
        'cidade',
        'estado',
        'telefone',
        'whatsapp',
        'site',
        'responsavel',
        'cpf_responsavel'
    ];

    public function orders()
    {
        return $this->hasMany(\Pedidos\Models\Order::class);
    }
}

