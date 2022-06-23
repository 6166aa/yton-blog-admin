import * as bcrypt from 'bcrypt';

export default async function hashStr(str: string) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(str, salt);
}
export async function validateHash(str: string, hash: string) {
  return await bcrypt.compare(str, hash);
}
