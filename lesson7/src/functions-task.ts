//From JS file:
//export function sumArrayTask(arr) {
//   return arr.reduce((acc, curr) => acc + curr, 0);
//}

export function sumArrayTask(arr: number[]): number {
    return arr.reduce((acc: number, curr: number) => acc + curr, 0);
}
