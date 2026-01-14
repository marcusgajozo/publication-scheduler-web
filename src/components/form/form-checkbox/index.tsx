import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface FormCheckboxProps<T extends FieldValues>
  extends React.ComponentProps<typeof Checkbox> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
}

export function FormCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  description,
  ...checkboxProps
}: FormCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="flex items-center gap-2">
            <Checkbox
              {...checkboxProps}
              id={field.name}
              checked={field.value || false}
              onCheckedChange={(checked) => {
                field.onChange(checked);
              }}
              aria-invalid={fieldState.invalid}
            />
            {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          </div>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
