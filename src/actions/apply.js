
export const addFriend = (user, dispatch) => {
    dispatch({
        type: "ADD_FRIEND",
        payload: {
            id: user.get('id')
        }
    })
}

export const applyToOrganization = (organization, dispatch) => {
    dispatch({
        type: "APPLY_TO_ORGANIZATION",
        payload: {
            id: organization.get('id')
        }
    })
}

export const applyToTeam = (team, dispatch) => {
    dispatch({
        type: "APPLY_TO_TEAM",
        payload: {
            id: team.get('id')
        }
    })
}

export const applyToProject = (project, dispatch) => {
    dispatch({
        type: "APPLY_TO_PROJECT",
        payload: {
            id: project.get('id')
        }
    })
}

