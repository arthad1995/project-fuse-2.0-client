import {Map} from 'immutable'
import Cookies from 'js-cookie'

const test = (groupList, elem) =>{
    const list = groupList.get('data')
    return !(list && list.get(elem.get('id')))
}

const group_test = (groupLists, elem) => {
    const ownerId = elem.get('owner_id') || elem.get('owner').get('id')
    return [true].concat(groupLists).reduce((accumulator, list) => {
        return accumulator && (!list || test(list, elem))
    }) && ownerId != Cookies.get('ID')
}

export const userTest = ({user, friends}, curUser) =>{
    if(user.get('data').get('user').get('id') == curUser.get('id'))
        return false
    return test(friends, curUser)
}

export const projTest = ({user_projects, applied_projects}, cur) =>{
    return group_test([user_projects, applied_projects], cur)
}

export const teamTest = ({user_teams, applied_teams}, cur) =>{
    return group_test([user_teams, applied_teams], cur)
}

export const orgTest = ({user_organizations, applied_organizations}, cur) =>{
    return group_test([user_organizations, applied_organizations], cur)
}