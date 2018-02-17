import {Map} from 'immutable'
import Cookies from 'js-cookie'
import v from 'voca'

const test = (groupList, elem) =>{
    const list = groupList.get('data')
    if (!list) return true
    let found = false
    return !list.find(item => {
        if(!item.get('sender') || !item.get('receiver')) {
            return false
        }
        if (item.get('receiver').get('id') === elem.get('id') || item.get('sender').get('id') === elem.get('id')) {
            return true
        }
        return false
    })
}

const findIndex = (arr, func) => {
    let index = -1
    arr.forEach((e, i) => {
        if (func(e)) {
            index = i
        }
    })
    return index
}

const test_group = (groupList, elem) => {
    const list = groupList.get('data')
    return !(list && -1 !== findIndex(list, (e => {
        const g = e.get('project') || e.get('organization') || e.get('team')
        if (g) {
            return g.get('id') === elem.get('id')
        } else {
            return e.get('id') === elem.get('id')
        }
    })))
}

const group_test = (groupLists, elem) => {
    const ownerId = elem.get('owner_id') || (elem.get('owner') ? elem.get('owner').get('id') : null)
    if (!ownerId) return '';
    return {
        show: [true].concat(groupLists).reduce((accumulator, list) => {
                        return accumulator && (!list || test_group(list, elem))
                    }) && ownerId != Cookies.get('ID'),
        text: v.lowerCase(elem.get('join_restriction')) === 'invite' ? "Apply" : "Join"
    }
}

export const userTest = ({user, friends}, curUser) =>{
    if(user.get('data').get('user').get('id') == curUser.get('id'))
        return false
    return test(friends, curUser) ? "Send Request" : false
}

export const projTest = ({user_projects, applied_projects}, cur) =>{
    const {show, text} = group_test([user_projects, applied_projects], cur)
    return show ? text : false
}


export const orgTest = ({user_organizations, applied_organizations}, cur) =>{
    const {show, text} = group_test([user_organizations, applied_organizations], cur)
    return show ? text : false
}