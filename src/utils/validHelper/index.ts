import { User } from "../../models/User";

export function removePassword(user: User) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

