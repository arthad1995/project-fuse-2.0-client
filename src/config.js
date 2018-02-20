
module.exports = {
    host: node.env.NODE_ENV === 'production' ?
        "https://api.project-fuse.com" :
        "http://localhost:8080"
}