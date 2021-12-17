const bcrypt = require('bcrypt');
const saltRounds = 10;


const cryptPass = async () => {
  const pass = '1234abc'
  
  const cryptedPass = await bcrypt.hash(pass, saltRounds)
  
  console.log(cryptedPass)
}

const comparePass = async () => {
  const pass = '1234abC'
  const myPass = "$2b$10$K8STzvKTJ4LsIaNaA8m3UueUDKFCSBx1JZXDf86nHs3sK9sCBeFX"

  const match = await bcrypt.compare(pass, myPass);

  console.log(match)
}

comparePass()