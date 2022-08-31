import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'is-search-type', async: false })
export class IsSearchType implements ValidatorConstraintInterface {
  validate(text: any, args: ValidationArguments) {
    return !text || text === 'TITLE' || text === 'AUTHOR';
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be string(TITLE | AUTHOR)`;
  }
}
