import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePurchase1743679484566 implements MigrationInterface {
  name = 'CreatePurchase1743679484566';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "purchases" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "price" numeric NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" integer,
                CONSTRAINT "PK_1d55032f37a34c6eceacbbca6b8" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "purchases"
            ADD CONSTRAINT "FK_024ddf7e04177a07fcb9806a90a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "purchases" DROP CONSTRAINT "FK_024ddf7e04177a07fcb9806a90a"
        `);
    await queryRunner.query(`
            DROP TABLE "purchases"
        `);
  }
}
