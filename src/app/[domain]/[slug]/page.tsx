import {useParams} from "next/navigation"
export function Page() {
    const p = useParams()
    console.log(p)
    return <>

    </>
}