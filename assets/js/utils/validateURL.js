/*eslint-disable */
export default function(string){
    try {
        const url = new URL(string)
    } catch (_) {
        return false
    }
    return true
}