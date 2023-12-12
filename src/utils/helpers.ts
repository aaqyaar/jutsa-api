import * as argon2 from 'argon2';

export const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password);
};

export const verifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await argon2.verify(hash, password);
};

export const formatPrismaError = (error: string, isError = true) => {
  switch (isError) {
    case error.includes('Unique constraint failed on the fields'):
      return 'This is already registered';
    default:
      return 'Internal server error';
  }
};
