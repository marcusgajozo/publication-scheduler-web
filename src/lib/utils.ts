import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toFormData<T extends Record<string, unknown>>(data: T) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(`${key}[]`, String(item)));
      return;
    }

    if (
      typeof value === "object" &&
      !(value instanceof File) &&
      !(value instanceof Blob)
    ) {
      formData.append(key, JSON.stringify(value));
      return;
    }

    formData.append(key, String(value));
  });

  return formData;
}
