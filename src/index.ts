import { h, render } from 'preact'
import Index from "./containers/Index";
import { list } from './action'

addEventListener('error', function (e) {
    alert(e)
    alert(e.message)
})

if ('serviceWorker' in navigator) {
    addEventListener('load', async function () {
        navigator.serviceWorker.register('/sw.js', {scope: '/'})
    })
}

list()
render(h(Index, {}), document.getElementById('app'))
