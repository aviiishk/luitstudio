export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  interest: string;
  budget: string | null;
  message: string;
  createdAt: string;
}
