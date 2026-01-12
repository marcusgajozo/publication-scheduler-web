import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface IFormInputProps<T extends FieldValues>
  extends React.ComponentProps<typeof Input> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  description,
  onChange,
  ...inputProps
}: IFormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          <Input
            {...inputProps}
            {...field}
            id={field.name}
            onChange={(e) => {
              field.onChange(e);
              onChange?.(e);
            }}
            aria-invalid={fieldState.invalid}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
