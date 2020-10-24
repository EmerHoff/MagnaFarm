import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnsUsuario1603556723288 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('usuario', [
            new TableColumn({
                name: 'identificador',
                type: 'varchar',
                isNullable: false,
            }),
            new TableColumn({
                name: 'telefone',
                type: 'varchar',
                isNullable: false,
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('usuario', 'identificador');
        await queryRunner.dropColumn('usuario', 'telefone');
    }

}
