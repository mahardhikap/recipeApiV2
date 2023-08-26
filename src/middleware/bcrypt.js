const bcrypt = require('bcryptjs')

const hashPassword = async (plainPassword) => {
    const saltRounds = 10; // Jumlah salt rounds, semakin tinggi semakin lama untuk meng-hash (tingkatkan jika keamanan lebih diutamakan)
    try {
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  }
  
const verifyPassword = async (plainPassword, hashedPassword) => {
    try {
      const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
      return isMatch;
    } catch (error) {
      throw error;
    }
}

module.exports = {
    hashPassword,
    verifyPassword
}