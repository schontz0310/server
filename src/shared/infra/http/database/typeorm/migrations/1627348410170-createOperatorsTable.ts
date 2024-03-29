import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createOperatorsTable1627348410170
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'operators',
        columns: [
          {
            name: 'operator_appointment_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'operator_appointment_code',
            type: 'smallint',
            isNullable: false,
          },
          {
            name: 'operator_appointment_date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'operator_appointment_hour',
            type: 'time',
            isNullable: false,
          },
          {
            name: 'operator_appointment_device',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'operator_appointment_company',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'operator_appointment_tag',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'operator_appointment_name',
            type: 'varchar(50)',
            isNullable: false,
          },
          {
            name: 'operator_appointment_level',
            type: 'varchar(2)',
            isNullable: false,
          },
          {
            name: 'operator_appointment_created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'operator_appointment_updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('operators');
  }
}
