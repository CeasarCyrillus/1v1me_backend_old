import { registerDecorator, ValidationArguments } from "class-validator";
import { tools } from "nanocurrency-web";

export const IsNanoAddress = () => (object: Object, propertyName: string) => {
  registerDecorator({
    name: "IsNanoAddress",
    target: object.constructor,
    propertyName: propertyName,
    options: { message: "Nano address is invalid" },
    validator: {
      validate(value: string, args: ValidationArguments) {
        if (!value) return false;
        return tools.validateAddress(value);
      },
    },
  });
};
