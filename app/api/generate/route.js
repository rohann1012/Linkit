
import clientPromise from "@/lib/mongodb"

export async function POST(request) {
    console.log('Received request to /api/generate');

    try {
        // Validate request body
        let body;
        try {
            body = await request.json();
        } catch (parseError) {
            console.error('Failed to parse request body:', parseError);
            return Response.json(
                { success: false, error: true, message: 'Invalid request format' },
                { status: 400 }
            );
        }

        console.log('Request body:', { url: body?.url, shorturl: body?.shorturl });
        
        if (!body?.url || !body?.shorturl) {
            console.log('Validation failed: Missing required fields');
            return Response.json(
                { success: false, error: true, message: 'URL and shorturl are required!' },
                { status: 400 }
            );
        }

        console.log('Attempting to connect to MongoDB...');
        let client;
        try {
            client = await clientPromise;
            console.log('MongoDB connection successful');
            
            const db = client.db("linkit");
            const collection = db.collection("url");
            
            // Check if shorturl already exists
            const existing = await collection.findOne({ shorturl: body.shorturl });
            if (existing) {
                return Response.json(
                    { success: false, error: true, message: 'This short URL is already taken.' },
                    { status: 409 }
                );
            }

            // Insert new URL
            await collection.insertOne({
                url: body.url,
                shorturl: body.shorturl,
                createdAt: new Date()
            });

            return Response.json(
                { success: true, error: false, message: 'URL shortened successfully!' },
                { status: 201 }
            );
            
        } catch (dbError) {
            console.error('Database operation error:', dbError);
            console.error('MongoDB URI format:', process.env.MONGODB_URI ? 'URI present' : 'URI missing');
            
            return Response.json(
                { 
                    success: false, 
                    error: true, 
                    message: 'Failed to process your request. Please try again later.',
                    details: process.env.NODE_ENV === 'development' ? dbError.message : undefined
                },
                { status: 503 }
            );
        }

        // Check if the short url exists
        const doc = await collection.findOne({shorturl: body.shorturl})
        if(doc){
            return Response.json(
                { success: false, error: true, message: 'URL already exists!' },
                { status: 409 }
            )
        }

        // Validate URL format
        try {
            new URL(body.url)
        } catch (e) {
            return Response.json(
                { success: false, error: true, message: 'Invalid URL format!' },
                { status: 400 }
            )
        }

        // Insert the new URL
        const result = await collection.insertOne({
            url: body.url,
            shorturl: body.shorturl,
            createdAt: new Date()
        })

        return Response.json(
            { success: true, error: false, message: 'URL Generated Successfully' },
            { status: 201 }
        )

    } catch (error) {
        console.error('API Error:', error)
        return Response.json(
            { success: false, error: true, message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}