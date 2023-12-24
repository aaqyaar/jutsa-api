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

//
export const excludeFields = <T>(
  obj: T,
  fields: Array<keyof T>,
): Partial<T> => {
  const newObj = { ...obj };
  fields.forEach((field) => delete newObj[field]);
  return newObj;
};

export const excludeFieldsFromArr = <T>(arr: T[], fields: Array<keyof T>) => {
  return arr.map((obj) => excludeFields(obj, fields));
};
