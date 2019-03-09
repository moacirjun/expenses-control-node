import {MigrationInterface, QueryRunner} from "typeorm";

export class makeCategoryRequiredInExpenseEntity1552172058739 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "tb_expense" DROP CONSTRAINT "FK_5925f871428bce2bfefa30b6bff"`);
        await queryRunner.query(`ALTER TABLE "tb_expense" ALTER COLUMN "category_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_expense" ADD CONSTRAINT "FK_5925f871428bce2bfefa30b6bff" FOREIGN KEY ("category_id") REFERENCES "tb_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "tb_expense" DROP CONSTRAINT "FK_5925f871428bce2bfefa30b6bff"`);
        await queryRunner.query(`ALTER TABLE "tb_expense" ALTER COLUMN "category_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_expense" ADD CONSTRAINT "FK_5925f871428bce2bfefa30b6bff" FOREIGN KEY ("category_id") REFERENCES "tb_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
