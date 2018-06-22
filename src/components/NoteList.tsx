import { h, Component } from 'preact'
import { Note } from '../interface'

const moment = time => {
    if (!time) {
        return time
    }
    const d = new Date();
    d.setTime(time);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`.replace(/\b(\d)\b/g, '0$1')
};

export interface NoteListProps {
    changeStatus: (status: string) => any
    edit: (focus: number) => any
    remove: (noteId: number) => any
    list: Note[]
    pageNum: number
}

export default class extends Component<NoteListProps, any> {
    render () {
        const { list = [], changeStatus, edit, remove } = this.props

        return <div class="panel">
            <p class="panel-heading">
                <div className="buttons">
                    <a className="button is-success is-small" onClick={() => changeStatus('add')}>新建</a>
                    <a className="button is-primary is-small" disabled>拉取全部</a>
                    <a className="button is-primary is-small" disabled>推送全部</a>
                </div>
            </p>
            <div className="panel-block">
                <table className="table is-fullwidth">
                    <thead>
                        <th>序号</th>
                        <th>标题</th>
                        <th className="is-hidden-mobile">创建时间</th>
                        <th className="is-hidden-mobile">最后更新</th>
                        <th>操作</th>
                    </thead>
                    <tbody>
                        {list.map((note, i) => <tr key={`${i}`}>
                            <th>{i + 1}</th>
                            <th>{note.title}</th>
                            <th className="is-hidden-mobile">{moment(note.createTime)}</th>
                            <th className="is-hidden-mobile">{moment(note.updateTime)}</th>
                            <th>
                                <a className="button is-text is-small" onClick={() => edit(i)}>详情</a>
                                {note.serverId && navigator.onLine && <a className="button is-text is-small" disabled>拉取</a>}
                                {note.needUpdate && <a className="button is-text is-small" disabled>推送</a>}
                                {(!note.serverId || navigator.onLine) && <a className="button is-text is-small" onClick={() => confirm('确定删除？') && remove(note.id)}>删除</a>}
                            </th>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    }
}