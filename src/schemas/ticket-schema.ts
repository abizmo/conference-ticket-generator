import { z, ZodError } from "zod";

const schema = z.object({
  file: z
    .instanceof(File, { message: "A photo is required." })
    .refine(
      (file) => file.size <= 500 * 1024,
      "File too large. Please upload a photo under 500KB.",
    ),
  fullName: z
    .string({ required_error: "This field is required" })
    .min(3, "Name must be 3 or more characters long."),
  email: z
    .string({ required_error: "This field is required" })
    .email("Please enter a valid email address."),
  ghUsername: z
    .string({ required_error: "This field is required" })
    .startsWith("@", "Must start with @")
    .min(4, "Username must be 3 or more characters long."),
});

export type TicketSchema = Partial<z.infer<typeof schema>>;
export type Key = keyof TicketSchema;
export type FieldErrors = Partial<Record<keyof TicketSchema, string>>;

function extractErrors(error: ZodError<FieldErrors>) {
  const formatted = error.format();

  const extractedErrors = Object.entries(formatted).reduce(
    (acc, [key, value]) => {
      if (key === "_errors") return acc; // Ignora errores generales
      if (
        typeof value === "object" &&
        "_errors" in value &&
        value._errors?.[0]
      ) {
        acc[key as keyof TicketSchema] = value._errors[0];
      }
      return acc;
    },
    {} as FieldErrors,
  );

  return extractedErrors;
}

export function validateFields(fields: TicketSchema) {
  const result = schema.safeParse(fields);

  if (result.success)
    return {
      success: true,
      data: result.data,
    };

  const extractedErrors = extractErrors(result.error);

  return {
    success: false,
    errors: extractedErrors,
  };
}
