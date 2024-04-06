const bcrypt = require('bcrypt');

const crypt = {
    saltRounds: 10,

    async encryptPassword(password) {
        try {
            const salt = await bcrypt.genSalt(this.saltRounds);
            const hash = await bcrypt.hash(password, salt);
            return hash;
        } catch (error) {
            throw new Error('Error al cifrar la contraseña');
        }
    },

    async comparePassword(plainPassword, hashedPassword) {
        try {
            const match = await bcrypt.compare(plainPassword, hashedPassword);
            return match;
        } catch (error) {
            throw new Error('Error al comparar contraseñas');
        }
    }
}

module.exports = crypt;