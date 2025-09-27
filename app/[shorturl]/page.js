import { redirect } from "next/navigation"
import clientPromise from "@/lib/mongodb"


export default async function Page({ params }) {
    // Await the params object as required by Next.js
    const { shorturl } = await params
    console.log('Looking up short URL:', shorturl)

    let doc = null;
    
    try {
        const client = await clientPromise;
        const db = client.db("linkit")
        const collection = db.collection("url")
        
        doc = await collection.findOne({ shorturl: shorturl })
        console.log('Found document:', doc)
    } catch (error) {
        // Only catch actual database errors
        console.error('Database error:', error)
        redirect(process.env.NEXT_HOST || 'http://localhost:3000')
    }

    // Handle the redirect outside of try-catch
    if (doc && doc.url) {
        const url = doc.url.startsWith('http') ? doc.url : `https://${doc.url}`
        console.log('Redirecting to:', url)
        redirect(url)
    }
    
    // If no document found, redirect to home
    console.log('Short URL not found, redirecting to home')
    redirect(process.env.NEXT_HOST || 'http://localhost:3000')
  }