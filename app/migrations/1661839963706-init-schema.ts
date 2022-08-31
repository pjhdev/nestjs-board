import { MigrationInterface, QueryRunner } from "typeorm";

export class initSchema1661839963706 implements MigrationInterface {
    name = 'initSchema1661839963706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`content\` text NOT NULL, \`author\` varchar(30) NOT NULL, \`parent\` bigint NOT NULL, \`board_id\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`board\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`title\` varchar(50) NOT NULL, \`content\` text NOT NULL, \`author\` varchar(30) NOT NULL, \`password\` text NOT NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), FULLTEXT INDEX \`idx_fulltext_title\` (\`title\`), FULLTEXT INDEX \`idx_fulltext_author\` (\`author\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`keyword\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`author\` varchar(30) NOT NULL, \`keyword\` varchar(30) NOT NULL, INDEX \`idx_keyword\` (\`keyword\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`fk_comment_board_board_id\` FOREIGN KEY (\`board_id\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`fk_comment_board_board_id\``);
        await queryRunner.query(`DROP INDEX \`idx_keyword\` ON \`keyword\``);
        await queryRunner.query(`DROP TABLE \`keyword\``);
        await queryRunner.query(`DROP INDEX \`idx_fulltext_author\` ON \`board\``);
        await queryRunner.query(`DROP INDEX \`idx_fulltext_title\` ON \`board\``);
        await queryRunner.query(`DROP TABLE \`board\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
    }

}
