process.env['PORT'] = 25565;
process.env['MONGODB'] = "mongodb://127.0.0.1:27017/TRAINING";



module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB,
    SECRET_TOKEN: "TESTING"
}