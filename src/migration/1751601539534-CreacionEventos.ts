import { MigrationInterface, QueryRunner } from "typeorm";

export class CreacionEventos1751601539534 implements MigrationInterface {
    name = 'CreacionEventos1751601539534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."events_category_enum" AS ENUM('CITA_MEDICA', 'PRACTICA', 'CLASE', 'RECORDATORIO')`);
        await queryRunner.query(`CREATE TYPE "public"."events_status_enum" AS ENUM('CREATED', 'IN_PROGRESS', 'FINISHED')`);
        await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, "hora" character varying NOT NULL, "min" character varying NOT NULL, "category" "public"."events_category_enum" NOT NULL, "status" "public"."events_status_enum" NOT NULL, "member_id" uuid, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_3bae21ff3c6111e78dfba5c3b93" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_3bae21ff3c6111e78dfba5c3b93"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TYPE "public"."events_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."events_category_enum"`);
    }

}
