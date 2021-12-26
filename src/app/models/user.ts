import {Role} from "./role";
import {Appointment} from "./appointment";

export class User {
  id!: number;
  username!: string;
  password!: string;
  name!: string;
  surname!: string;
  role!: Role;
  appointment?: Appointment;
  token?: string;
}
