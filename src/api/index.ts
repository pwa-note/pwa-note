import { FetchEvent, Note } from '../interface'
import * as db from './db'

const H = json => new Response(JSON.stringify(json))

export const execute = async (event: FetchEvent): Promise<Response> => {
    const clone = event.request.clone()
    const { url, method = 'GET' } = clone

    if (url.indexOf('/api/note') !== -1) {
        switch (method.toUpperCase()) {
            case 'GET':
                const list = await db.list()
                return H(list)
            case 'POST':
                const note:Note = await clone.json()
                return H(await db.save(note))
            case 'DELETE':
                const noteId = parseInt(url.split('/').pop(), 10)
                return H(await db.remove(noteId))
        }
    }
}