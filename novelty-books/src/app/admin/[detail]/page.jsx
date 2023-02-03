"use client"
import MiPerfil from "@/components/MiPerfil";
import { usePathname } from "next/navigation";

function Detail() {
    const pathName = usePathname().slice(7);
    return (
        <>
        <MiPerfil userID={pathName}/>
        </>
    )
}


export default Detail;