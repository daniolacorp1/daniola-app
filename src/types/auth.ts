export type AuthMode = "login" | "register";

export interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (data: any) => void;
}