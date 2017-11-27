import {Async} from '../../common'
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export const Editor = (props) => <Async {...props} load={import('react-draft-wysiwyg')} component_id='Editor' />