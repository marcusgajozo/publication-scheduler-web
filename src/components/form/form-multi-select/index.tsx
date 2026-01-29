import { MultiSelect } from "@/components/multi-select";
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

interface FormMultiSelectProps<
  T extends FieldValues,
> extends React.ComponentProps<typeof MultiSelect> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
}

export function FormMultiSelect<T extends FieldValues>({
  control,
  name,
  label,
  description,
  onValuesChange,
  ...selectProps
}: FormMultiSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          <MultiSelect
            {...selectProps}
            id={field.name}
            values={field.value}
            onValuesChange={(value) => {
              field.onChange(value);
              onValuesChange?.(value);
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
