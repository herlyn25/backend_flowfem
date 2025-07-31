import { MigrationInterface, QueryRunner } from "typeorm";

export class InicioTablas1753996545664 implements MigrationInterface {
    name = 'InicioTablas1753996545664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "age" integer NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "photo" character varying, "gender" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."events_category_enum" AS ENUM('CITA_MEDICA', 'PRACTICA', 'CLASE', 'RECORDATORIO')`);
        await queryRunner.query(`CREATE TYPE "public"."events_status_enum" AS ENUM('CREATED', 'IN_PROGRESS', 'FINISHED')`);
        await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, "hora" character varying NOT NULL, "min" character varying NOT NULL, "fecha" date, "category" "public"."events_category_enum" NOT NULL, "status" "public"."events_status_enum" NOT NULL, "member_id" uuid, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "gender" character varying, "photo" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_3bae21ff3c6111e78dfba5c3b93" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_da404b5fd9c390e25338996e2d1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_da404b5fd9c390e25338996e2d1"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_3bae21ff3c6111e78dfba5c3b93"`);
        await queryRunner.query(`DROP TABLE "members"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TYPE "public"."events_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."events_category_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
