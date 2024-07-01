
export function removePassword(user: any) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

