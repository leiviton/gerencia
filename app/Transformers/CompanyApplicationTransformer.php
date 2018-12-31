<?php

namespace Pedidos\Transformers;

use League\Fractal\TransformerAbstract;
use Pedidos\Models\CompanyApplication;

/**
 * Class CompanyApplicationTransformer
 * @package namespace Pedidos\Transformers;
 */
class CompanyApplicationTransformer extends TransformerAbstract
{

    /**
     * Transform the CompanyApplication entity
     * @param Pedidos\Models\CompanyApplication $model
     *
     * @return array
     */
    public function transform(CompanyApplication $model)
    {
        return [
            'id'         => (int) $model->id,
            'razao_social' => $model->razao_social,
            'nome_fantazia' => $model->nome_fantazia,
            'cnpj' => $model->cnpj,
            'inscricao_estatual' => $model->inscricao_estatual,
            'cep' => $model->cep,
            'endereco' => $model->endereco,
            'numero' => $model->numero,
            'complemento' => $model->complemento,
            'bairro' => $model->bairro,
            'cidade' => $model->cidade,
            'estado' => $model->estado,
            'telefone' => $model->telefone,
            'whatsapp' => $model->whatsapp,
            'site' => $model->site,
            'responsavel' => $model->responsavel,
            'cpf_responsavel' => $model->cpf_responsavel,

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}
