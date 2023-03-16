import { hash } from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string) => {
  return await hash(password, SALT_ROUNDS);
};
