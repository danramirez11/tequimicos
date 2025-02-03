import { useState } from "react";

type LandingPageProps = {
    onLogIn: (input: string) => void;
}

const LandingPage = ({onLogIn}: LandingPageProps) => {
    const [ input, setInput ] = useState('');

    return (
        <section className="page"> 
        <h1>Todo envases y químicos</h1>
        <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
        />
        <button className="blue" onClick={() => onLogIn(input)}>Ingresar</button>
        </section>
    );
}

export default LandingPage;