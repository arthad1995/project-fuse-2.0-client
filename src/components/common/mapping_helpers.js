
export const mapSingleKey = (key) => (state) => {
    let map = {}
    map[key] = state[key]
    return map
}

export const mapMultKeys = (keys) => (state) => {
    let map = {}
    keys.forEach(key => {
        map[key] = state[key] 
    });
    return map
}