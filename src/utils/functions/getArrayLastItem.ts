export default function getArrayLastItem<T>(arr?: Array<T>) {
   return (!arr || !arr.length) ? undefined : arr[arr.length - 1]
}
