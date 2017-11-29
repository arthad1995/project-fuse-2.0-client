import {Map} from 'immutable'

const test = (groupList, elem) =>{
    const list = groupList.get('data')
    return !(list && list.get(elem.get('id')))
}

const group_test = (groupList, elem) => {
    return test(groupList, elem) && elem.get('owner').get('id') != elem.get('id')
}

export const userTest = ({user, friends}, curUser) =>{
    if(user.get('data').get('user').get('id') == curUser.get('id'))
        return false
    return test(friends, curUser)
}

export const projTest = ({user_projects}, cur) =>{
    return group_test(user_projects, cur)
}

export const teamTest = ({user_teams}, cur) =>{
    return group_test(user_teams, cur)
}

export const orgTest = ({user_organizations}, cur) =>{
    return group_test(user_organizations, cur)
}