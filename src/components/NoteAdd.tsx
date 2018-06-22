import { h, Component } from 'preact'
import { Note } from '../interface'

export interface NoteAddProps {
    changeStatus: {
        (status: string): any
    }
    save: {
        (note: Note): any
    }
}

export default class extends Component<NoteAddProps, any> {
    note:Note = {}
    onInput = (k, v) => {
        this.note[k] = v
    }
    onSubmit = (e: Event) => {
        e.preventDefault()
        const { save } = this.props
        save && save(this.note)
    }
    render () {
        const { onSubmit, onInput } = this
        const { changeStatus } = this.props
        return <div class="panel">
            <p class="panel-heading">新建</p>
            <div className="panel-block">
                <form onSubmit={onSubmit}>
                    <div className="field">
                        <label className="label">标题</label>
                        <div className="control">
                            <input className="input" placeholder="标题" onInput={(e) => onInput('title', e.target['value'])}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">内容</label>
                        <div className="control">
                            <textarea className="textarea" placeholder="内容" onInput={(e) => onInput('content', e.target['value'])}/>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <input className="button is-primary" type="submit" value="提交"/>
                        </div>
                        <div className="control">
                            <input className="button is-text" type="reset" onClick={() => changeStatus('list')} value="取消"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    }
}