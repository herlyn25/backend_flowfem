import { MigrationInterface, QueryRunner } from "typeorm";

export class AgregandoCampoFechaEvento1753245915145 implements MigrationInterface {
    name = 'AgregandoCampoFechaEvento1753245915145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" ADD "fecha" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP COLUMN "fecha"`);
    }

}
