import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateExerciseCommon1708436473907 implements MigrationInterface {
    name = 'UpdateExerciseCommon1708436473907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise" DROP COLUMN "thumbPath"`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP COLUMN "postDate"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "evaluation" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "evaluation" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "health_vision" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "health_vision" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "via" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "via" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "exercise_steps" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "exercise_steps" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "exercise_steps" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "exercise_steps" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "via" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "via" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "health_vision" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "health_vision" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "evaluation" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "evaluation" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD "postDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD "thumbPath" character varying NOT NULL`);
    }

}
