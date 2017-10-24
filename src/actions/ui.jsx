
export const reset_tabs = () =>{
    return {
        type: 'RESET_TABS'
    }
}

export const change_tab = target_tab => {
    return {
        type: 'CHANGE_TAB',
        payload: target_tab
    }
}
