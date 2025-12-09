import * as bcrypt from 'bcrypt';

async function hashPassword() {
  const plainPassword = "Admin@PeerHub101";
  const salt = await bcrypt.genSalt(); 
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  console.log('Hashed password:', hashedPassword);
}

hashPassword();