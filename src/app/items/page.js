"use client";

import { useState, useEffect } from "react";

const ItemsPage = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const fetchItems = async () => {
        const res = await fetch("/api/items");
        console.log('get=====>',res);
        const data = await res.json();
        setItems(data);
    };

    const addItem = async () => {
        const res = await fetch("/api/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description }),
        });
        console.log('post=====>',res);
        if (res.ok) fetchItems();
    };

    const deleteItem = async (id) => {
        await fetch(`/api/items?id=${id}`, { method: "DELETE" });
        fetchItems();
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div>
            <h1>Items</h1>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={addItem}>Add Item</button>
            <ul>
                {items && items.map((item) => {
                    return (
                        <li key={item._id}>
                            {item.name}: {item.description}
                            <button onClick={() => deleteItem(item._id)}>Delete</button>
                        </li>
                    )
                }

                )}
            </ul>
        </div>
    );
};

export default ItemsPage;
