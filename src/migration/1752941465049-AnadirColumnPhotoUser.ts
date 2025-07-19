import { MigrationInterface, QueryRunner } from "typeorm";

export class AnadirColumnPhotoUser1752941465049 implements MigrationInterface {
    name = 'AnadirColumnPhotoUser1752941465049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "photo" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "photo"`);
    }

}
