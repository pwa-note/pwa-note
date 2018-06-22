import NoteList, { NoteListProps } from '../components/NoteList'
import { connect, getState } from '../store'
import { changeStatus, changeFocus, remove } from '../action'

const edit = (focus) => changeFocus(focus, 'focus')
export default connect((): NoteListProps => {
    const { pageNum, list } = getState()
    return {
        pageNum, list, changeStatus, edit, remove
    }
})(NoteList);
