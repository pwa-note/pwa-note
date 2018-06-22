import NoteAdd, { NoteAddProps } from '../components/NoteAdd'
import { connect } from '../store'
import { save, changeStatus } from '../action'

export default connect((): NoteAddProps => {
    return {
        changeStatus,
        save
    }
})(NoteAdd);
