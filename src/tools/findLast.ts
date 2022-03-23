export default function findLast<T>(array: T[], predicate: (a: T) => boolean): T | undefined {
    for (let i = array.length - 1; i >= 0; --i) {
        const x = array[i];
        if (predicate(x)) {
            return x;
        }
    }
}