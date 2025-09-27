"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Shorten = () => {
    const [url, seturl] = useState("")
    const [shorturl, setshorturl] = useState("")
    const [generated, setGenerated] = useState("")
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(generated)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy:', err)
            alert('Failed to copy to clipboard')
        }
    }

    const generate = async () => {
        if (!url || !shorturl) {
            alert('Please fill in both URL and short URL fields');
            return;
        }

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    url: url.trim(),
                    shorturl: shorturl.trim()
                })
            });

            // Try to parse the JSON response
            let result;
            try {
                result = await response.json();
            } catch (parseError) {
                console.error('Failed to parse response:', parseError);
                throw new Error('Server response was not in the expected format');
            }

            // Check if the response was ok
            if (!response.ok) {
                throw new Error(result?.message || `Error: ${response.status}`);
            }

            // Handle successful response
            if (result.success) {
                const baseUrl = process.env.NEXT_PUBLIC_HOST || window.location.origin;
                setGenerated(`${baseUrl}/${shorturl}`);
                seturl("");
                setshorturl("");
                alert('URL shortened successfully!');
            } else {
                alert(result.message || 'Failed to generate short URL');
            }
        } catch (error) {
            console.error('Error generating short URL:', error);
            alert(error.message || 'An error occurred while generating the short URL. Please try again.');
        }
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

                {generated && (
                    <div className='flex flex-col gap-2'>
                        <span className='font-bold text-lg text-white'>Your Link</span>
                        <div className='flex items-center gap-2 bg-white/10 p-2 rounded-lg'>
                            <code className='text-white flex-1 overflow-x-auto'>
                                <Link target="_blank" href={generated} className='text-white hover:text-blue-300 transition-colors'>
                                    {generated}
                                </Link>
                            </code>
                            <button
                                onClick={copyToClipboard}
                                className={`px-3 py-1 rounded-md transition-all ${
                                    copied 
                                        ? 'bg-green-500 text-white'
                                        : 'bg-white text-[#203a43] hover:bg-gray-200'
                                }`}
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Shorten