import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsuarioTable1603040177762 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'usuario',
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
                    name: 'login',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true,
                }, 
                {
                    name: 'senha',
                    type: 'varchar',
                    isNullable: false,
                }
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuario');
    }

}
