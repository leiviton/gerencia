<?php


use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;


class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
            'role-list',
            'role-create',
            'role-edit',
            'role-delete',
            'product-list',
            'product-create',
            'product-edit',
            'product-delete',
            'client-list',
            'client-create',
            'client-edit',
            'client-delete',
            'order-list',
            'order-create',
            'order-edit',
            'order-delete',
            'caixa-list',
            'caixa-create',
            'caixa-edit',
            'caixa-delete',
            'category-list',
            'category-create',
            'category-edit',
            'category-delete',
            'complement-list',
            'complement-create',
            'complement-edit',
            'complement-delete',
            'mesa-list',
            'mesa-create',
            'mesa-edit',
            'mesa-delete',
            'user-list',
            'user-create',
            'user-edit',
            'user-delete',
        ];


        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }
    }
}