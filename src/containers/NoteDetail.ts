import NoteDetail, { NoteDetailProps } from '../components/NoteDetail'
import { connect, getState } from '../store'
import { changeStatus } from '../action'

export default connect((): NoteDetailProps => {
    const { focus, list = [] } = getState()
    return {
        changeStatus,
        note: list[focus] || {}
    }
})(NoteDetail);
