import { Select } from "@/components/select";
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

interface SelectItem {
  value: string | number;
  label: string;
}

interface BaseFormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  selectItems?: SelectItem[];
  titleFixed?: string;
  hasSearch?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

interface SingleFormSelectProps<T extends FieldValues>
  extends BaseFormSelectProps<T> {
  multiSelect?: false;
}

interface MultiFormSelectProps<T extends FieldValues>
  extends BaseFormSelectProps<T> {
  multiSelect: true;
}

type FormSelectProps<T extends FieldValues> =
  | SingleFormSelectProps<T>
  | MultiFormSelectProps<T>;

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  description,
  multiSelect = false,
  ...selectProps
}: FormSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          <Select
            {...selectProps}
            id={field.name}
            value={field.value}
            multiSelect={multiSelect}
            onValueChange={(value: string | number | (string | number)[]) => {
              field.onChange(value);
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
