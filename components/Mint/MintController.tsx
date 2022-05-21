import React from "react";

const MintController = ({ min, max, value, handleChange }) => {
    return (
        <div className="flex flex-col w-full">
            <input
                type="range"
                min={min || 1}
                max={max || 1}
                value={value}
                onChange={(e) => handleChange(Number(e.target.value))}
                className="range range-primary "
            />
            <div
                className="w-full flex justify-between text-md px-2 mt-3"
            >
                <>
                    <span>{min}</span>
                    <span>{max}</span>
                </>
            </div>
        </div>
    );
};

export default MintController;
