"use client"

import { useMemo, useState } from "react";


export default function SpreadText({text}: {text: string}) {

    const [isHovered,setIsHovered] = useState(false);


    const letters = useMemo(()=>{
        return text.split("").map((char,index)=>{
            const angle = index*137.5*(Math.PI/180);
            const distance = 25 + (index % 4) * 15;  // 4 possible values bw 25 and 70

            return{
                char:char === " " ? "\u00A0":char,
                x: Math.round(Math.cos(angle)*distance),
                y: Math.round(Math.sin(angle)*distance),
                rotate: ((index % 5)-2)*12,
            }
        })
    },[text])


    return(
        <div
            onMouseEnter={()=>setIsHovered(true)}
            onMouseLeave={()=>setIsHovered(false)}
            className={`inline-flex flex-wrap`}>
            {letters.map((item,idx)=>(
                <span
                key={idx}
                style={{transform: isHovered ? `translate3d(${item.x}px,${item.y}px,0) rotate(${item.rotate}deg)` : "translate3d(0px,0px,0px) rotate(0deg)"}}
                className="inline-block transition-all duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
                >
                    {item.char}
                </span>
            ))}
        </div>
    )

}