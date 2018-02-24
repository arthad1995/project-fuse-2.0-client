export const stopEvent = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
}

export const stopEventWrapper = func => e =>  {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    e.preventDefault();
    return func()
}