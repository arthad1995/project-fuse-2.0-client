
export const userTest = (_, curUser) =>{
    if (curUser.get('actions_available') === 'add')
        return 'Send Friend Request'
    return false
}

export const projTest = (_, cur) =>{
    if (cur.get('actions_available') === 'join')
        return 'Join Project'
    if (cur.get('actions_available') === 'apply')
        return 'Apply To Project'
    return false
}


export const orgTest = (_, cur) =>{
    if (cur.get('actions_available') === 'join')
        return 'Join Organization'
    if (cur.get('actions_available') === 'apply')
        return 'Apply To Organization'
    return false
}