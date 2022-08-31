import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'is-valid-page-request', async: false })
export class IsValidPageRequest implements ValidatorConstraintInterface {
  validate(text: any, args: ValidationArguments) {
    if (args.property === "page" || args.property === "limit") {
      return Number(text) > 0;
    }

    if (args.property === "order") {
      return text === 'ASC' || text === 'DESC';
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    if (args.property === "page" || args.property === "limit") {
      return `${args.property} must be larger than 0`;
    }

    if (args.property === "order") {
      return `${args.property} must be string(ASC | DESC)`;
    }

    return `invalid page request args`;
  }
}
