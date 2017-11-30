
export const addFriend = (user, dispatch) => {
    dispatch({
        type: "ADD_FRIEND",
        payload: {
            id: user.get('id'),
            name: user.get('name')
        }
    })
}

export const applyToOrganization = (organization, dispatch) => {
    dispatch({
        type: "APPLY_TO_ORGANIZATION",
        payload: {
            id: organization.get('id'),
            name: organization.get('name')
        }
    })
}

export const applyToTeam = (team, dispatch) => {
    dispatch({
        type: "APPLY_TO_TEAM",
        payload: {
            id: team.get('id'),
            name: team.get('name')
        }
    })
}

export const applyToProject = (project, dispatch) => {
    dispatch({
        type: "APPLY_TO_PROJECT",
        payload: {
            id: project.get('id'),
            name: project.get('name')
        }
    })
}

