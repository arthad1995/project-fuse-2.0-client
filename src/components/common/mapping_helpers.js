
export const mapSingleKey = (key) => (state) => {
    let map = {}
    map[key] = state[key]
    return map
}

export const mapSingleKeyWithSearch = (key) => (state) => {
    return Object.assign(
        mapSingleKey(key)(state),
        {local_search: state.ui.get('local_search')}
    )
}

export const mapSingleKeyWithUI = (key) => (state) => {
    return Object.assign(
        mapSingleKey(key)(state),
        {ui: state.ui}
    )
}

export const mapMultKeys = (keys) => (state) => {
    let map = {}
    keys.forEach(key => {
        map[key] = state[key] 
    });
    return map
}