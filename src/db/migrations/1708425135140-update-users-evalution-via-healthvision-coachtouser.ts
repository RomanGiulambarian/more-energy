import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsersEvalutionViaHealthvisionCoachtouser1708425135140 implements MigrationInterface {
    name = 'UpdateUsersEvalutionViaHealthvisionCoachtouser1708425135140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "evaluation" DROP CONSTRAINT "FK_115170ae291135522efdb1fb23c"`);
        await queryRunner.query(`ALTER TABLE "health_vision" DROP CONSTRAINT "FK_75103605eb77455c19c32469df6"`);
        await queryRunner.query(`ALTER TABLE "via" DROP CONSTRAINT "FK_2fcbf18a899d13fcc043642cbc5"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP CONSTRAINT "FK_d68f79471da66dd8fe8380f764a"`);
        await queryRunner.query(`ALTER TABLE "via" RENAME COLUMN "userId" TO "usersId"`);
        await queryRunner.query(`ALTER TABLE "evaluation" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "health_vision" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "evaluationId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD "healthVisionId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD "viaId" uuid`);
        await queryRunner.query(`ALTER TABLE "via" ADD CONSTRAINT "FK_e1a44af8ab964966ced9d2ee820" FOREIGN KEY ("usersId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_0cbb62c9509b3a7a104b3790a2e" FOREIGN KEY ("evaluationId") REFERENCES "evaluation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_68c8d101f15aa7ac0692e30b420" FOREIGN KEY ("healthVisionId") REFERENCES "health_vision"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_076b7a747dc3c6cc38a9479baf7" FOREIGN KEY ("viaId") REFERENCES "via"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_076b7a747dc3c6cc38a9479baf7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_68c8d101f15aa7ac0692e30b420"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_0cbb62c9509b3a7a104b3790a2e"`);
        await queryRunner.query(`ALTER TABLE "via" DROP CONSTRAINT "FK_e1a44af8ab964966ced9d2ee820"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "viaId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "healthVisionId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "evaluationId"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "health_vision" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "evaluation" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "via" RENAME COLUMN "usersId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD CONSTRAINT "FK_d68f79471da66dd8fe8380f764a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "via" ADD CONSTRAINT "FK_2fcbf18a899d13fcc043642cbc5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "health_vision" ADD CONSTRAINT "FK_75103605eb77455c19c32469df6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evaluation" ADD CONSTRAINT "FK_115170ae291135522efdb1fb23c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
