import bcrypt, { hash } from "bcrypt";

const salt = 15;

export default async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, salt);

  return hash;
}
