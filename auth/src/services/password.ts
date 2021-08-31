import bcrypt from 'bcrypt';

export class Password{
  static toHash(password: string): string {
    return bcrypt.hashSync(password, 8);
  }

  static compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(hash, password);
  }
}