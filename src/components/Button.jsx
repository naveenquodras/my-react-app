import { useState } from 'react';

export default function Button() {
    const [count, setCount] = useState(0);

    return (
        <button className="button" onClick={() => setCount(count + 1)}>Clicked me {count} times</button>
    );
}