import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnUsuario1603567025422 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('usuario', 
            new TableColumn({
                name: 'nome',
                type: 'varchar',
                isNullable: false,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('usuario', 'nome');
    }

}
