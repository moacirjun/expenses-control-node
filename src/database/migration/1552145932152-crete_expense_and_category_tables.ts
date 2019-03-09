import {MigrationInterface, QueryRunner} from "typeorm";

export class creteExpenseAndCategoryTables1552145932152 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "tb_expense" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(255) NOT NULL, "amount" numeric(11,2) NOT NULL, "category_id" integer, CONSTRAINT "PK_b5bd628d57a599f04693c4e4b84" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_category" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_394d39970459679271183ff2bee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_expense" ADD CONSTRAINT "FK_5925f871428bce2bfefa30b6bff" FOREIGN KEY ("category_id") REFERENCES "tb_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "tb_expense" DROP CONSTRAINT "FK_5925f871428bce2bfefa30b6bff"`);
        await queryRunner.query(`DROP TABLE "tb_category"`);
        await queryRunner.query(`DROP TABLE "tb_expense"`);
    }

}
