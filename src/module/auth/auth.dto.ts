export interface ICreateUserDto {
  fullName: string;
  email: string;
  password: string;
  rePassword: string;
  gender: "Male" | "Female";
  phone: string;
}
