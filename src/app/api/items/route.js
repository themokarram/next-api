import connectToDatabase from "@/lib/mongodb";
import Item from "@/models/Item";

export async function GET(request) {
    try {
        await connectToDatabase();
        const items = await Item.find();
        return new Response(JSON.stringify(items), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch items" }), { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        await connectToDatabase();
        const newItem = new Item(body);
        await newItem.save();
        return new Response(JSON.stringify(newItem), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to create item" }), { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        await connectToDatabase();
        await Item.findByIdAndDelete(id);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to delete item" }), { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        await connectToDatabase();
        const updatedItem = await Item.findByIdAndUpdate(id, body, { new: true });
        return new Response(JSON.stringify(updatedItem), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to update item" }), { status: 500 });
    }
}
