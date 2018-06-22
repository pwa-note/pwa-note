const { argv } = process
const build = argv[argv.length - 1] === 'build'
module.exports = {
    livereload: !build,
    build,
    useLess: true,
    gzip: true,
    onRoute: p => {
        if (!p) {
            return 'index.html'
        }
    },
    buildFilter: p => /src|css|index|favicon|img|manifest/.test(p),
    middlewares: [
        { middleware: 'rollup' },
        () => {
            return {
                onGet (pathname, data) {
                    if (/^sw\.js/.test(pathname)) {
                        return (data + '').replace('const EXCEPTS', `CACHE_KEY = 'my-app-cache-${Date.now()}';\n` + 'const EXCEPTS' )
                    }
                }
            }
        }
    ],
    output: require('path').join(__dirname, './output')
}
