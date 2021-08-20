import * as bcrypt  from 'bcryptjs'

class Password{
  password:String
  constructor(password:String){
     this.password=password

  }
  public async getPassword(){
    this.password=await bcrypt.hash(this.password,10)
    return this.password        
  }
}
export {Password}