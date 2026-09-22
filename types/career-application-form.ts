export interface CareerApplicationFormState {
  status: "idle" | "success" | "error";
  message: string;
}

export const initialCareerApplicationFormState: CareerApplicationFormState = {
  status: "idle",
  message: "",
};
