
export default (paths, params) => {
    let res = []
    for (let i = 0; i < paths.length; ++i) {
        res.push({ path: paths[i], param: params[i] })
    }
    return res
}