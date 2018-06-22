import createStore, { IPreact, DispatchAction, Connect } from 'ipreact'
import { StoreState } from './interface'

const initState: StoreState = {
    pageNum: 1,
    list: [],
    focus: -1,
    status: "list"
}
const { connect, getState, dispatch }: IPreact<StoreState> = createStore()(initState)

export { connect, getState, dispatch }