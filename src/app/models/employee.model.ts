export interface Employee {
  set(user: Employee): void;
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  points: number;
  profilePicUrl: string;
}
