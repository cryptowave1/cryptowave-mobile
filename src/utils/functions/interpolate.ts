export default function interpolate (i: number, a: number, b: number, a2: number, b2: number) {
   return (i - a) * (b2 - a2) / (b - a) + a2
}
