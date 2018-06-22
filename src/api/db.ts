import { Note, NoteFile } from '../interface'
import Dexie from 'dexie'

class App extends Dexie {
    notes: Dexie.Table<Note, number>
    files: Dexie.Table<NoteFile, number>

    constructor () {
        super('my-app-db')
        this.version(1).stores({
            files: '++id, noteId, url, blob' ,
            notes: '++id, title, content, serverId, needUpdate, createTime, updateTime'
        });
    }
}

const db = new App()
db.files.where('noteId').equals(0).delete()

export const list = async () => {
    const list = await db.notes.toArray()
    return {
        success: true,
        list
    }
}
export const save = async (note: Note) => await db.transaction('rw', db.notes, db.files, async () => {
    note.createTime = Date.now()
    note.needUpdate = true
    const noteId = await db.notes.add(note)
    let matches = [];
    (note.content || '').replace(/<img\s+src="([^"]+)"/g, (a, b) => {
        matches.push(b)
        return a
    })
    await db.files.where('noteId').equals(noteId).modify({noteId: 0})
    for (let i = 0; i < matches.length; i++) {
        await db.files.where('url').equals(matches[i]).modify({noteId})
    }
    return {success: true}
})

export const remove = async (noteId: number) => await db.transaction('rw', db.notes, db.files, async () => {
    const note = await db.notes.get(noteId)
    if (!note) {
        return {
            success: false,
            error: 'note not found!'
        }
    }
    let matches = [];
    (note.content || '').replace(/<img\s+src="([^"]+)"/g, (a, b) => {
        matches.push(b)
        return a
    })
    await db.notes.where('id').equals(noteId).delete()
    await db.files.where('noteId').equals(noteId).delete()
    return {success: true}
}) 