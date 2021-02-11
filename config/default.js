const config = { 
    apiConfig: {
        LOL: process.env.API_KEY_LOL
    },
    appConfig: { 
        host: process.env.APP_HOST,
        port: process.env.APP_PORT, 
    },
    cloudinaryConfig: {
        cldName: process.env.CLOUDINARY_CLOUD_NAME,
        key: process.env.CLOUDINARY_API_KEY,
        secret: process.env.CLOUDINARY_API_SECRET,
    },
    ipConfig: {
        key: process.env.API_KEY_IPSTACK
    }, 
    mail: {
        clientGoo: process.env.ID_GOOGLE_CLIENT,
        secretGoo: process.env.ID_GOOGLE_SECRET,
        refreshGoo: process.env.GOOGLE_REFRESHTOKEN_MAIL,
    },
    mailTemp: {
        emailTemp: process.env.EMAIL_TEMP,
        passTemp: process.env.PASSWORD_EMAIL_TEMP 
    },
    jwtKey: process.env.SECRET_KEY,
    emailPass: process.env.PASSWORD_EMAIL_VERSUS,
    emailActive: process.env.EMAIL_ACTIVE
}

module.exports = config 