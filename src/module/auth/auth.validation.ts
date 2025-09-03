import * as z from "zod";
import { GenderEnum } from "../../utils/types/Models";

export const signup = {
  body: z
    .strictObject({
      fullName: z.string().regex(/^[A-Za-z]{2,} [A-Za-z]{2,}$/, {
        error: "full name must be like ex.Ahmed Amr",
      }),
      email: z.email(),

      password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
      rePassword: z.string(),
      gender: z.enum(GenderEnum),
      phone: z.string().regex(/^01[1250][0-9]{8}$/),
    })
    .refine((data) => data.password === data.rePassword, {
      path: ["rePassword"],
      error: "rePassword mismatch with password",
    }),
};
