import { useEffect, useState } from "react";

const App = () => {

    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchHello = async () => {
            const response = await fetch("http://localhost:3000/api/coucou");
            const data = await response.json();
            setMessage(data.message);
        };
        fetchHello();
    });

    return (
        <>
            <h1>Necroland</h1>
            <p>{message}</p>
        </>
    )
}

export default App;