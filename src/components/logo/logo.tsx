import Image from "next/image";

export function Logo() {
    return (
        <Image src={'/logo.svg'} width={170} height={30} alt={'Logo'}/>
    )
}