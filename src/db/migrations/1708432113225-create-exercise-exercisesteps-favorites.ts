import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateExerciseExercisestepsFavorites1708432113225 implements MigrationInterface {
    name = 'CreateExerciseExercisestepsFavorites1708432113225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "via" DROP CONSTRAINT "FK_e1a44af8ab964966ced9d2ee820"`);
        await queryRunner.query(`CREATE TABLE "exercise_steps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "text" character varying NOT NULL, "position" integer NOT NULL, CONSTRAINT "PK_36df07a13d65e2e420c3457f142" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exercise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "thumbPath" character varying NOT NULL, "postDate" TIMESTAMP NOT NULL, "tip" character varying NOT NULL, "videoLink" character varying NOT NULL, "exerciseStepsId" uuid, CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."favorites_contenttype_enum" AS ENUM('article', 'recipe', 'exercise')`);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "contentType" "public"."favorites_contenttype_enum" NOT NULL, "userId" uuid, "contentId" uuid, CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "via" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "coacheId" uuid`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD CONSTRAINT "FK_27c6064e9a06d450ed68f74158a" FOREIGN KEY ("exerciseStepsId") REFERENCES "exercise_steps"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_e747534006c6e3c2f09939da60f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_2aa43b2f9bd4b35427c0c50c10e" FOREIGN KEY ("contentId") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_13281390e998d6a3b7bf7ccbae8" FOREIGN KEY ("coacheId") REFERENCES "сoach_to_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_13281390e998d6a3b7bf7ccbae8"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_2aa43b2f9bd4b35427c0c50c10e"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_e747534006c6e3c2f09939da60f"`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "FK_27c6064e9a06d450ed68f74158a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "coacheId"`);
        await queryRunner.query(`ALTER TABLE "via" ADD "usersId" uuid`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`DROP TYPE "public"."favorites_contenttype_enum"`);
        await queryRunner.query(`DROP TABLE "exercise"`);
        await queryRunner.query(`DROP TABLE "exercise_steps"`);
        await queryRunner.query(`ALTER TABLE "via" ADD CONSTRAINT "FK_e1a44af8ab964966ced9d2ee820" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
