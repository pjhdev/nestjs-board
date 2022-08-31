import { Table, NamingStrategyInterface } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export class CustomNamingStrategy
  extends SnakeNamingStrategy
  implements NamingStrategyInterface
{
  foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    referencedTablePath?: string,
    referencedColumnNames?: string[],
  ): string {
    tableOrName =
      typeof tableOrName === 'string' ? tableOrName : tableOrName.name;

    const name = columnNames.reduce(
      (name, column) => `${name}_${column}`,
      `${tableOrName}_${referencedTablePath}`,
    );

    //return `fk_${crypto.createHash('md5').update(name).digest("hex")}`;
    return `fk_${name}`;
  }
}
