import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1715027798827 implements MigrationInterface {
    name = 'Auto1715027798827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_session"
            ADD "languageCode" character varying(8) NOT NULL DEFAULT 'ru'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_session" DROP COLUMN "languageCode"
        `);
    }

}
