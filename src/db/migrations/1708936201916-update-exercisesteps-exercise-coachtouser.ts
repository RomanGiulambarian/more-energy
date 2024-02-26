import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateExercisestepsExerciseCoachtouser1708936201916 implements MigrationInterface {
    name = 'UpdateExercisestepsExerciseCoachtouser1708936201916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP CONSTRAINT "FK_f258c4ec4e275965b68de6c9aad"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP CONSTRAINT "FK_269a2965af29b8d55279d45da3b"`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "FK_27c6064e9a06d450ed68f74158a"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP COLUMN "coachIdId"`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP COLUMN "exerciseStepsId"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD "coachId" uuid`);
        await queryRunner.query(`ALTER TABLE "exercise_steps" ADD "exerciseId" uuid`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD CONSTRAINT "FK_d68f79471da66dd8fe8380f764a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD CONSTRAINT "FK_92d3fbeab7d3e96f6587321dbd8" FOREIGN KEY ("coachId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercise_steps" ADD CONSTRAINT "FK_d985d09d14230fd28ecc9d1796d" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise_steps" DROP CONSTRAINT "FK_d985d09d14230fd28ecc9d1796d"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP CONSTRAINT "FK_92d3fbeab7d3e96f6587321dbd8"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP CONSTRAINT "FK_d68f79471da66dd8fe8380f764a"`);
        await queryRunner.query(`ALTER TABLE "exercise_steps" DROP COLUMN "exerciseId"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP COLUMN "coachId"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD "exerciseStepsId" uuid`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD "coachIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD CONSTRAINT "FK_27c6064e9a06d450ed68f74158a" FOREIGN KEY ("exerciseStepsId") REFERENCES "exercise_steps"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD CONSTRAINT "FK_269a2965af29b8d55279d45da3b" FOREIGN KEY ("coachIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD CONSTRAINT "FK_f258c4ec4e275965b68de6c9aad" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
