import {MigrationInterface, QueryRunner} from "typeorm";

export class mainMigration1641620528076 implements MigrationInterface {
    name = 'mainMigration1641620528076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "card" character varying NOT NULL, "cvv" character varying NOT NULL, "expiryDate" character varying NOT NULL, "accountNumber" character varying NOT NULL, "dateCreated" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
