function isWindows() {
    return navigator.platform.indexOf('Win') > -1
}

export {
    isWindows,
    isWindows as default,
}