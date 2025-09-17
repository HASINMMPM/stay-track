import bcrypt from "bcrypt";
export class Hashes{
  async hashPassword(password:string){
    return await bcrypt.hash(password, 10);
  }
  async comparePassword(password:string, hashedPassword:string){
    return await bcrypt.compare(password, hashedPassword);
  }
}