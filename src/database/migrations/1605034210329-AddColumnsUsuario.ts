import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnsUsuario1605034210329 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('usuario', [
            new TableColumn({
                name: 'dh_registro',
                type: 'date',
            }),
            new TableColumn({
                name: 'admin',
                type: 'boolean',
                default: false,
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('usuario', 'dh_registro');
        await queryRunner.dropColumn('usuario', 'admin');
    }

}
