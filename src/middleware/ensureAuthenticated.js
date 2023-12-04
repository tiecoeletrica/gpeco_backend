const jsonwebtoken = require("jsonwebtoken");

const { Verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require("../config/auth")

function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;

    if (!authConfig) throw new AppError("JWT token não informado", 401)

    const [, token] = authHeader.split(" ")

    try {
        const { sub: colaborador_id } = verify(token, authConfig.jwt.secret);

        request.colaborador = {
            id: Number(colaborador_id)
        }

        return next();
    } catch (e) {
        throw new AppError("JWT token inválido", 401)
    }
}

module.exports = ensureAuthenticated