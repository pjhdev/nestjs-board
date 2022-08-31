import { instanceToPlain, plainToInstance } from 'class-transformer';

export function fromEntity<T>(type: any, entity: T | T[]): T | T[] {
  return plainToInstance(
    type,
    instanceToPlain(entity, {
      excludePrefixes: ['__', 'password'],
    }),
  );
}
