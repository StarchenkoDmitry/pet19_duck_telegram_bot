import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1715068879348 implements MigrationInterface {
    name = 'Auto1715068879348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_session" (
                "id" bigint NOT NULL,
                "firstName" character varying(256) NOT NULL,
                "state" integer NOT NULL DEFAULT '0',
                "languageCode" character varying(8) NOT NULL DEFAULT 'ru',
                CONSTRAINT "PK_adf3b49590842ac3cf54cac451a" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user_session"
        `);
    }

}
