import NoteAdd from '../containers/NoteAdd'
import NoteDetail from '../containers/NoteDetail'
import NoteList from '../containers/NoteList'
import { h, Component } from 'preact';

export default class extends Component<{status: string}, any> {

    render () {
        const { status } = this.props
        return <div className={'inner is-status-' + status}>
            <NoteAdd />
            <NoteList />
            <NoteDetail />
        </div>
    }
}
