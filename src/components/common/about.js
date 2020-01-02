import React from "react";
function About(props) {
    return (
    <div>
        <h1>About</h1>
        <button onClick={() => props.history.push('/')}>back</button>
    </div>
    );
}
export default About;