import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";
import { tools } from "nanocurrency-web";

export const IsNanoAddress = (validationOptions?: ValidationOptions) => (
  object: Object,
  propertyName: string,
) => {
  registerDecorator({
    name: "IsNanoAddress",
    target: object.constructor,
    propertyName: propertyName,
    options: validationOptions,
    validator: {
      validate(value: string, args: ValidationArguments) {
        if (!value) return false;
        return tools.validateAddress(value);
      },
    },
  });
};
