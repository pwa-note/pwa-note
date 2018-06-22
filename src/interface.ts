
export interface FetchEvent extends Event {
    request: Request
    respondWith: {
        (resp: Promise<Response>): void
    }
    waitUntil: {
        (cacheAll: Promise<any>): void
    }
}

export interface Note {
    id?: number
    title?: string
    content?: string
    serverId?: number
    needUpdate?: boolean
    createTime?: number
    updateTime?: number
}

export interface NoteFile {
    id?: number
    noteId: number
    url?: string
    blob?: Blob
}

export interface StoreState {
    pageNum: number
    list: Note[]
    focus: number
    status: "list" | "focus" | "add" | "edit"
}

export interface FetchProps {
    success: boolean
    [k:string]: any
}