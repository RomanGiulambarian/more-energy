import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersEvalutionViaHealthvisionCoachtouser1708419861659 implements MigrationInterface {
    name = 'CreateUsersEvalutionViaHealthvisionCoachtouser1708419861659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "evaluation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "weight" integer NOT NULL, "bodyFat" integer NOT NULL, "visceralFat" integer NOT NULL, "skeletalMuscleMass" integer NOT NULL, "bloodUp" integer NOT NULL, "bloodDown" integer NOT NULL, "hearRate" integer NOT NULL, "waistCircum" integer NOT NULL, "hipCircum" integer NOT NULL, "agRatio" integer NOT NULL, "cholesterol" integer NOT NULL, "bloodSugar" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_b72edd439b9db736f55b584fa54" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "health_vision" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "topValues" character varying NOT NULL, "iWant" integer NOT NULL, "whyWant" character varying NOT NULL, "willing" character varying NOT NULL, "visionStatement" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_04322c36990ae10b8562aa5399e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "via" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "courage" integer NOT NULL, "forgiveness" integer NOT NULL, "creativity" character varying NOT NULL, "love" character varying NOT NULL, "spirituality" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_8bfbf81a6b34cb7607e6ae297cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'coach', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "photoPath" character varying NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "isActive" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "сoach_to_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_1e0ea568e484d0df4ce62701fe6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "evaluation" ADD CONSTRAINT "FK_115170ae291135522efdb1fb23c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "health_vision" ADD CONSTRAINT "FK_75103605eb77455c19c32469df6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "via" ADD CONSTRAINT "FK_2fcbf18a899d13fcc043642cbc5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "сoach_to_user" ADD CONSTRAINT "FK_d68f79471da66dd8fe8380f764a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "сoach_to_user" DROP CONSTRAINT "FK_d68f79471da66dd8fe8380f764a"`);
        await queryRunner.query(`ALTER TABLE "via" DROP CONSTRAINT "FK_2fcbf18a899d13fcc043642cbc5"`);
        await queryRunner.query(`ALTER TABLE "health_vision" DROP CONSTRAINT "FK_75103605eb77455c19c32469df6"`);
        await queryRunner.query(`ALTER TABLE "evaluation" DROP CONSTRAINT "FK_115170ae291135522efdb1fb23c"`);
        await queryRunner.query(`DROP TABLE "сoach_to_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "via"`);
        await queryRunner.query(`DROP TABLE "health_vision"`);
        await queryRunner.query(`DROP TABLE "evaluation"`);
    }

}
