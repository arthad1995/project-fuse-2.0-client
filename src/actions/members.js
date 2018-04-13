import Network from '../network'
import v from 'voca'

export const loadProjectMembers = (id) => {
    const network = new Network('LOAD_PROJECT_MEMBERS')
    const network2 = new Network('LOAD_PROJECT_BY_ID')
    return Promise.all([
        network.GET(`/projects/${id}/members`),
        network2.GET(`/projects/${id}`)
    ])
}

export const loadTeamMembers = (id) => {
    const network = new Network('LOAD_TEAM_MEMBERS')
    return network.GET(`/teams/${id}/members`)
}

export const loadOrganizationMembers = (id) => {
    const network = new Network('LOAD_ORGANIZATION_MEMBERS')
    const network2 = new Network('LOAD_ORGANIZATION_BY_ID')
    return Promise.all([
        network.GET(`/organizations/${id}/members`),
        network2.GET(`/organizations/${id}`)
    ])
}

export const grantAdminAccess = (type, id, member_id) => () => {
    const network = new Network(`GRANT_${v.upperCase(type)}_ADMIN`)
    const p_type = (type == 'Organization') ? 'organizations' : 'projects'
    const reload = (type == 'Organization') ? loadOrganizationMembers : loadProjectMembers
    return network.POST(`/${p_type}/${id}/members/${member_id}/grant/admin`).then(() => reload(id))
}

export const revokeAdminAccess = (type, id, member_id) => () => {
    const network = new Network(`REVOKE_${v.upperCase(type)}_ADMIN`)
    const p_type = (type == 'Organization') ? 'organizations' : 'projects'
    const reload = (type == 'Organization') ? loadOrganizationMembers : loadProjectMembers
    return network.POST(`/${p_type}/${id}/members/${member_id}/revoke/admin`).then(() => reload(id))
}

export const grantCreateAccess = (id, member_id) => () => {
    const network = new Network(`GRANT_ORGANIZATION_CREATE_PROJ`)
    return network.POST(`/organizations/${id}/members/${member_id}/grant/project_create`).then(() => loadOrganizationMembers(id))
}

export const revokeCreateAccess = (id, member_id) => () => {
    const network = new Network(`REVOKE_ORGANIZATION_CREATE_PROJ`)
    return network.POST(`/organizations/${id}/members/${member_id}/revoke/project_create`).then(() => loadOrganizationMembers(id))
}

export const kickMember = (type, id, member_id) => () => {
    const network = new Network(`KICK_${v.upperCase(type)}_MEMBER`)
    const p_type = (type == 'Organization') ? 'organizations' : 'projects'
    const reload = (type == 'Organization') ? loadOrganizationMembers : loadProjectMembers
    return network.POST(`/${p_type}/${id}/members/${member_id}/kick`).then(() => reload(id))
}
