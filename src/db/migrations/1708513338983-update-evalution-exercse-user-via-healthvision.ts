import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEvalutionExercseUserViaHealthvision1708513338983 implements MigrationInterface {
    name = 'UpdateEvalutionExercseUserViaHealthvision1708513338983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_0cbb62c9509b3a7a104b3790a2e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_68c8d101f15aa7ac0692e30b420"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_076b7a747dc3c6cc38a9479baf7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_13281390e998d6a3b7bf7ccbae8"`);
        await queryRunner.query(`CREATE TABLE "media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "exerciseId" uuid, CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "evaluationId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "healthVisionId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "viaId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "coacheId"`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD "coachIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "evaluation" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "evaluation" ADD CONSTRAINT "UQ_115170ae291135522efdb1fb23c" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "via" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "via" ADD CONSTRAINT "UQ_2fcbf18a899d13fcc043642cbc5" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "health_vision" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "health_vision" ADD CONSTRAINT "UQ_75103605eb77455c19c32469df6" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD CONSTRAINT "FK_f258c4ec4e275965b68de6c9aad" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD CONSTRAINT "FK_269a2965af29b8d55279d45da3b" FOREIGN KEY ("coachIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evaluation" ADD CONSTRAINT "FK_115170ae291135522efdb1fb23c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "via" ADD CONSTRAINT "FK_2fcbf18a899d13fcc043642cbc5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "health_vision" ADD CONSTRAINT "FK_75103605eb77455c19c32469df6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "media" ADD CONSTRAINT "FK_4a4185c105b9ef0e22c88526dfe" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT "FK_4a4185c105b9ef0e22c88526dfe"`);
        await queryRunner.query(`ALTER TABLE "health_vision" DROP CONSTRAINT "FK_75103605eb77455c19c32469df6"`);
        await queryRunner.query(`ALTER TABLE "via" DROP CONSTRAINT "FK_2fcbf18a899d13fcc043642cbc5"`);
        await queryRunner.query(`ALTER TABLE "evaluation" DROP CONSTRAINT "FK_115170ae291135522efdb1fb23c"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP CONSTRAINT "FK_269a2965af29b8d55279d45da3b"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP CONSTRAINT "FK_f258c4ec4e275965b68de6c9aad"`);
        await queryRunner.query(`ALTER TABLE "health_vision" DROP CONSTRAINT "UQ_75103605eb77455c19c32469df6"`);
        await queryRunner.query(`ALTER TABLE "health_vision" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "via" DROP CONSTRAINT "UQ_2fcbf18a899d13fcc043642cbc5"`);
        await queryRunner.query(`ALTER TABLE "via" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "evaluation" DROP CONSTRAINT "UQ_115170ae291135522efdb1fb23c"`);
        await queryRunner.query(`ALTER TABLE "evaluation" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP COLUMN "coachIdId"`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "coacheId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD "viaId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD "healthVisionId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD "evaluationId" uuid`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP TABLE "media"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_13281390e998d6a3b7bf7ccbae8" FOREIGN KEY ("coacheId") REFERENCES "сoach_to_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_076b7a747dc3c6cc38a9479baf7" FOREIGN KEY ("viaId") REFERENCES "via"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_68c8d101f15aa7ac0692e30b420" FOREIGN KEY ("healthVisionId") REFERENCES "health_vision"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_0cbb62c9509b3a7a104b3790a2e" FOREIGN KEY ("evaluationId") REFERENCES "evaluation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
