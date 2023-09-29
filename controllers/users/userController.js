const {
    invalidFieldResponse,
    errorResponse,
    successResponse,
} = require("../../utils/errorHandler");
const { validateEmail, validatePassword } = require("../../utils/validator");
const { generateToken } = require("../../utils/auth");
const { registerUser, getUserById } = require("./userService");
const bcrypt = require("bcrypt");

const userController = {
    signUp: async (req, res) => {
        try {
            const { name, email, username, password } = req.body;
            if (!name || !email || !username || !password) {
                return invalidFieldResponse(res, "All fields are mandatory!");
            }

            if (!validateEmail(email)) {
                return errorResponse(res, "email is not valid!");
            }
            if (!validatePassword(password)) {
                return errorResponse(res, "password is not valid!");
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const userData = {
                name,
                email,
                username,
                password: hashedPassword,
            };

            const existingUser = await getUserById({ username, email });
            if (existingUser) {
                return errorResponse(
                    res,
                    { username },
                    "user already register, please login!"
                );
            }

            const userRegistrationData = await registerUser(userData);
            if (!userRegistrationData) {
                return errorResponse(
                    res,
                    { username },
                    "couldn't create user, username and email should be unique!"
                );
            }
            return successResponse(
                res,
                { userRegistrationData },
                "user created successfully"
            );
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return invalidFieldResponse(
                    res,
                    {},
                    "username and password are mandatory"
                );
            }

            const user = await getUserById({ username });
            if (!user) {
                return errorResponse(res, { username }, "No user founds");
            }

            const matchPassword = await bcrypt.compare(password, user.password);
            if (!matchPassword) {
                return errorResponse(res, {}, "wrong password");
            }

            const access_token = generateToken(user, "access");
            // const refresh_token = generateJWTToken(user, "refresh");

            return successResponse(
                res,
                { access_token },
                "User Login successfully"
            );
        } catch (error) {
            console.error(error);
            return error;
        }
    },
};

module.exports = userController;
