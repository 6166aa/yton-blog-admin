import { plainToClass } from 'class-transformer';

export default function Keyof<T extends object>(classConstructor: T): (keyof T)[] {
  return Object.getOwnPropertyNames(classConstructor) as any as (keyof T)[];
}
