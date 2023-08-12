import bcrypt from 'bcryptjs';

export const Password = {
  hashPassword: (password: string) => {
    if (password) {
      return bcrypt.hashSync(password, 10);
    } else {
      return null;
    }
  },
  comparePassword: (passwordA: string, passwordB: string) => {
    return bcrypt.compareSync(passwordA, passwordB);
  }
};
