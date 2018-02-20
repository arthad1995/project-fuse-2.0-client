
module.exports = {
    host: process.env.NODE_ENV === 'production' ?
        "https://api.project-fuse.com" :
        "http://localhost:8080"
}