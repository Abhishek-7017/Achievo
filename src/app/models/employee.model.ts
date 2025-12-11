export interface Employee {
  set(user: Employee): void;
  id: string;
  userName: string;
  fullName: string;
  email: string;
  phone: string;
  role: string[];
  department: string;
  totalPoints: number;
  isActive: boolean;
  joiningDate: Date;
  profilePicUrl: string;
}
