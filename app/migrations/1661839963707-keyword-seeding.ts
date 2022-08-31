import { MigrationInterface, QueryRunner } from 'typeorm';

export class keywordSeeding1661839963707 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let values = '';
    for (let i = 0; i < 10000; ++i) {
      if (values === '') {
        values += `("author", "keyword${i}")`;
      } else {
        values += `,("author", "keyword${i}")`;
      }
    }
    await queryRunner.query(
      'INSERT INTO Keyword(author, keyword) VALUES ' + values,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM Keyword WHERE author = "author";');
  }
}
