const jwt=require('jsonwebtoken')

const generateTokenAndSetCookie = (userId) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET, {
        expiresIn: '15d',
    })

    return token;
}

module.exports = generateTokenAndSetCookie