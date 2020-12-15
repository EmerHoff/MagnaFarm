import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateAssinaturaTable1606501118085 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'assinatura',
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
                    name: 'quantidade_total',
                    type: 'numeric',
                    isNullable: false,
                }, 
                {
                    name: 'quantidade_contratada',
                    type: 'numeric',
                    isNullable: false,
                },
                {
                    name: 'atual',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'dh_registro',
                    type: 'date',
                    isNullable: true,
                }
            ],
        }));

        await queryRunner.createForeignKey('assinatura', new TableForeignKey({
            columnNames: ['id_usuario'],
            referencedColumnNames: ['id'],
            referencedTableName: 'usuario'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('assinatura');

        const foreingKeyUsuario = table.foreignKeys.find(
            fk => fk.columnNames.indexOf('id_usuario') !== -1
        );

        await queryRunner.dropForeignKey(
            'assinatura',
            foreingKeyUsuario
        );

        await queryRunner.dropColumn(
            'assinatura',
            'id_usuario'
        );

        await queryRunner.dropTable('assinatura');
    }

}
