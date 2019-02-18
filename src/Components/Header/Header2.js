import React from 'react';

function Header2(props) {
    return (
        <header>
            <div className="top">
                <h1>Country Viewer</h1>
                <h2>Find Your Random Country For The Day! Which is WAY less cool than finding random beer for the day, but my API got USED BY SAMone *cough* I mean SOMEONE!</h2>
            </div>
            <button className="myButton" onClick={()=> props.getRandomCountry()}>Get Random Country</button>
                       
      </header>
    );
}

export default Header2;