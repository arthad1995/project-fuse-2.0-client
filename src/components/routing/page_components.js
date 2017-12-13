import { CreatePage, MembersPage } from '../common'

export default {
    edit: pg => CreatePage(pg),
    members: pg => MembersPage(pg),
    settings: pg => pg.param.component(pg)
}
