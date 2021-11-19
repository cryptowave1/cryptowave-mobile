export default function areObjectsEqual(left: Object, right: Object) {
   return JSON.stringify(left) === JSON.stringify(right)
}
