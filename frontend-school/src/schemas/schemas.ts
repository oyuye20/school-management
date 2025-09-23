import { boolean, z } from "zod";
export const studentSchemaZod = z
  .object({
    first_name: z.string().nonempty("First name required"),
    middle_name: z.string().nullable(),
    hasNoMiddleName: boolean(),
    gender: z
      .string()
      .nullable() // ✅ allow null first
      .refine((val) => val !== null, {
        message: "Please select your gender",
      }),
    last_name: z.string().nonempty("Last name required"),
    contact_number: z.string().nonempty("Contact number required").min(11).max(11),
    birthday: z.string().nonempty("Birthday required"),
    house_no: z.string().nonempty("House number required"),
    street: z.string().nonempty("Street required"),
    province: z.string().nonempty("Province required"),
    city: z.string().nonempty("City required"),
    barangay: z.string().nonempty("Barangay required"),
    email: z.email().nonempty("Email required"),
    password: z
      .string()
      .nonempty("Password required")
      .min(6, "Password must minimum of length of 6"),
    confirm_pass: z.string(),
  })
  .refine((data) => data.password === data.confirm_pass, {
    error: "Password don't match",
    path: ["confirm_pass"],
  })
  .refine(
    (data) => {
      if (!data.hasNoMiddleName) {
        return data.middle_name !== null && data.middle_name.trim() !== "";
      }
      return true;
    },
    {
      message: "Middle name is required",
      path: ["middle_name"],
    }
  );
