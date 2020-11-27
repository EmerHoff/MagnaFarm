import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTalhaoTable1606501581353 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'talhao',
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
                    name: 'id_propriedade',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'nome',
                    type: 'varchar'
                }, 
                {
                    name: 'area',
                    type: 'numeric',
                },
                {
                    name: 'kml',
                    type: 'varchar',
                }
            ],
        }));

        await queryRunner.createForeignKey('talhao', new TableForeignKey({
            columnNames: ['id_propriedade'],
            referencedColumnNames: ['id'],
            referencedTableName: 'propriedade'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('talhao');

        const foreingKeyPropriedade = table.foreignKeys.find(
            fk => fk.columnNames.indexOf('id_propriedade') !== -1
        );

        await queryRunner.dropForeignKey(
            'talhao',
            foreingKeyPropriedade
        );

        await queryRunner.dropColumn(
            'talhao',
            'id_propriedade'
        );

        await queryRunner.dropTable('talhao');
    }

}
