import * as bcrypt from 'bcrypt';

const hash = (password: string, saltRounds = 10): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

const compare = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export { hash, compare };
