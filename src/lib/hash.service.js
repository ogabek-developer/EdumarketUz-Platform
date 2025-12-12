
import { hash, compare } from "bcrypt"

const hashService = {
    hashPassword: (password) => hash(password, 10),
    comparePassword: (password, hashPassword) => compare(password, hashPassword)
}

export default hashService ;