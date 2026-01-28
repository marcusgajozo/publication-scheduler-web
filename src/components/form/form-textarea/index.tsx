import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface FormTextareaProps<T extends FieldValues>
  extends React.ComponentProps<typeof Textarea> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
}

export function FormTextarea<T extends FieldValues>({
  control,
  name,
  label,
  description,
  onChange,
  ...textareaProps
}: FormTextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          <Textarea
            {...textareaProps}
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
