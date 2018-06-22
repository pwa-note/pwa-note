import { h, Component } from 'preact'
import { Note, FetchProps } from '../interface'

export interface NoteDetailProps {
    changeStatus: (status: any) => void
    note: Note
}

export default (props: NoteDetailProps) => <div class="panel">
    <p class="panel-heading">
        <div className="columns is-mobile">
            <span class="column">详情</span>
            <div className="column has-text-right">
                <a className="button is-text" onClick={() => props.changeStatus('list')}>返回</a>
            </div>
        </div>
    </p>
    <div className="panel-block">
        <div className="content">
            <h2>{props.note.title}</h2>
            <div dangerouslySetInnerHTML={{__html: props.note.content}}/>
        </div>
    </div>
</div>