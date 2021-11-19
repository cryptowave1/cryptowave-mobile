export default function getArrayLastItem(arr?: Array<any>) {
   return (!arr || !arr.length) ? undefined : arr[arr.length - 1]
}
