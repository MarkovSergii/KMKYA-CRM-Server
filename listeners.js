/**
 * Created by user on 20.10.2016.
 */
const R = require('ramda')

const exit = (code) => {
    debug('app:exit')('About to exit with code:', code);
    process.exit(code)
}

const promiseRejected = (p, reason) =>
    console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason)

R.map(event => process.on(event, exit), ['beforeExit', 'exit', 'uncaughtException', 'SIGTERM', 'SIGINT'])
R.map(event => process.on(event, promiseRejected), ['rejectionHandled', 'unhandledRejection'])