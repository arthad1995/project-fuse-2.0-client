export const stopEvent = (e) => {
    e.stopPropagation(); 
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
}