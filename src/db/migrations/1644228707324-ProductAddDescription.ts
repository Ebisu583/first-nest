import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductAddDescription1644228707324 implements MigrationInterface {
  name = 'ProductAddDescription1644228707324';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`description\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`description\``,
    );
  }
}
