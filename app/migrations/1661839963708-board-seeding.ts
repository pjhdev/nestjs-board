import { MigrationInterface, QueryRunner } from 'typeorm';

export class boardSeeding1661839963708 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // $2b$10$hnmJgcDtuB7yu7gYHEwit.xmGKI/jjz38D3u9qwFXMOU9HGM5LdR. <= salted password "1234"
    let values = '';
    for (let i = 0; i < 10000; ++i) {
      if (values === '') {
        values += `("title1", "keyword${i} keyword${i}", "author", "$2b$10$hnmJgcDtuB7yu7gYHEwit.xmGKI/jjz38D3u9qwFXMOU9HGM5LdR.")`;
      } else {
        values += `,("title1", "keyword${i} keyword${i}", "author", "$2b$10$hnmJgcDtuB7yu7gYHEwit.xmGKI/jjz38D3u9qwFXMOU9HGM5LdR.")`;
      }
    }
    await queryRunner.query(
      'INSERT INTO Board(title, content, author, password) VALUES ' + values,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM Board WHERE author = "author";');
  }
}
