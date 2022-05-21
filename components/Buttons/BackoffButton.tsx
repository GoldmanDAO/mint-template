import React from "react";

const BackoffButton = () => {
    return (<>
        <a href="https://discord.com/invite/" target="_blank">
            <button className="btn btn-primary text-white mt-3 w-full">Join us on discord</button>
        </a>
        <a
            href="https://opensea.io/collection/"
            target="_blank"
        >
            <button className="btn btn-primary text-white w-full">Go to OpenSea</button>
        </a>
    </>)
};

export default BackoffButton;
