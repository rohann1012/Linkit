"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Shorten = () => {
    const [url, seturl] = useState("")
    const [shorturl, setshorturl] = useState("")
    const [generated, setGenerated] = useState("")

    const generate = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shorturl": shorturl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`)
                seturl("")   
                setshorturl("")
                console.log(result)
                alert(result.message)
            
            })
            .catch((error) => console.error(error));
    }


    return (
        <div className="min-h-screen bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center">
            <div className='mx-auto max-w-lg w-full p-8 rounded-lg flex flex-col gap-4'>
                <h1 className='font-bold text-2xl text-white'>Generate your short URLs</h1>
                <div className='flex flex-col gap-2'>
                    <input type="text"
                        value={url}
                        className='px-4 py-2 focus:outline-[#2c5364] rounded-md'
                        placeholder='Enter your URL'
                        onChange={e => { seturl(e.target.value) }} />

                    <input type="text"
                        value={shorturl}
                        className='px-4 py-2 focus:outline-[#2c5364] rounded-md'
                        placeholder='Enter your preferred short URL text'
                        onChange={e => { setshorturl(e.target.value) }} />
                    <button onClick={generate} className='bg-gradient-to-r from-[#0f2027] to-[#203a43] rounded-lg shadow-lg p-3 py-1 my-3 font-bold text-white'>Generate</button>
                </div>

                {generated && <> <span className='font-bold text-lg text-white'>Your Link </span><code className='text-white'><Link target="_blank" href={generated} className='text-white'>{generated}</Link> 
                    </code></>}
            </div>
        </div>
    )
}

export default Shorten