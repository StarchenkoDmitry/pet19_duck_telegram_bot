import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1714812350875 implements MigrationInterface {
    name = 'Auto1714812350875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_session" (
                "id" bigint NOT NULL,
                "firstName" character varying(256) NOT NULL,
                "state" "public"."user_session_state_enum" NOT NULL DEFAULT '0',
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
