import { MigrationInterface, QueryRunner } from "typeorm";

export class AnadirColumnGenderUserAndMember1752950837771 implements MigrationInterface {
    name = 'AnadirColumnGenderUserAndMember1752950837771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "members" ADD "gender" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "gender" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "gender"`);
    }

}
