
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

export const show_time_picker = () => {
    return {
        type: 'SHOW_TIME_PICKER'
    }
}

export const hide_time_picker = () => {
    return {
        type: 'HIDE_TIME_PICKER'
    }
}
