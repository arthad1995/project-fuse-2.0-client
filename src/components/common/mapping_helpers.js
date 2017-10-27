
export const mapSingleKey = (key) => (state) => {
    let map = {}
    map[key] = state[key]
    return map
}