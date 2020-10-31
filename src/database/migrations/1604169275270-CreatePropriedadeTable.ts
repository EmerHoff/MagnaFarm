import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreatePropriedadeTable1604169275270 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'propriedade',
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
                    name: 'id_usuario',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'nome',
                    type: 'varchar',
                    isNullable: false,
                }, 
                {
                    name: 'endereco',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'comarca',
                    type: 'varchar',
                },
                {
                    name: 'matricula',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'area',
                    type: 'numeric',
                    isNullable: false,
                }
            ],
        }));

        await queryRunner.createForeignKey('propriedade', new TableForeignKey({
            columnNames: ['id_usuario'],
            referencedColumnNames: ['id'],
            referencedTableName: 'usuario'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('propriedade');

        const foreingKeyUsuario = table.foreignKeys.find(
            fk => fk.columnNames.indexOf('id_usuario') !== -1
        );

        await queryRunner.dropForeignKey(
            'propriedade',
            foreingKeyUsuario
        );

        await queryRunner.dropColumn(
            'propriedade',
            'id_usuario'
        );

        await queryRunner.dropTable('propriedade');
    }

}
