import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTipoSemeaduraTable1611877306330 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tipo_semeadura',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isUnique: true
                },
                {
                    name: 'cultivo',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'ciclo',
                    type: 'numeric',
                    isNullable: false,
                }
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tipo_semeadura');
    }

}
