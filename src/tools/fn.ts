const isFunction = <T>(f: T | (() => T)): f is (() => T) => (f instanceof Function);

export default function fn<T>(f: T | (() => T)): T {
    if (isFunction(f)) {
        return f();
    }
    return f;
}