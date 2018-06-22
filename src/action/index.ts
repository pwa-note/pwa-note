import { Note } from '../interface'
import { getState, dispatch } from '../store'

const F = (url, args?: RequestInit) => fetch(url, args).then(res => res.json())

export const list = () => F('/api/note').then(({list}) => dispatch(state => {
    return {
        ...state,
        status: 'list',
        list
    }
}))

export const save = (note: Note) => {
    if (note.title && note.content) {
        F('/api/note', {
            method: 'POST',
            body: JSON.stringify(note)
        }).then(list)
    } else {
        alert('标题和内容需要填写!')
    }
}

export const remove = (noteId: number) => F(`/api/note/${noteId}`, {
    method: 'DELETE'
}).then(list)

export const changeStatus = (status) => dispatch(state => {
    return {
        ...state,
        status
    }
})

export const changeFocus = (focus, status) => dispatch(state => {
    return {
        ...state,
        status,
        focus
    }
})