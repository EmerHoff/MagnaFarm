import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateSemeaduraTable1606503405641 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'semeadura',
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
                    name: 'id_talhao',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'plantio',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'dias',
                    type: 'numeric',
                    isNullable: false,
                },
                {
                    name: 'atual',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'data_plantio',
                    type: 'date',
                }
            ],
        }));

        await queryRunner.createForeignKey('semeadura', new TableForeignKey({
            columnNames: ['id_talhao'],
            referencedColumnNames: ['id'],
            referencedTableName: 'talhao'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('semeadura');

        const foreingKeyUsuario = table.foreignKeys.find(
            fk => fk.columnNames.indexOf('id_talhao') !== -1
        );

        await queryRunner.dropForeignKey(
            'semeadura',
            foreingKeyUsuario
        );

        await queryRunner.dropColumn(
            'semeadura',
            'id_talhao'
        );

        await queryRunner.dropTable('semeadura');
    }
}
