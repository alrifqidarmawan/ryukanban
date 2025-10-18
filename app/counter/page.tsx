"use client"

import React, {useState} from 'react';
import CustomButton from "@/components/CustomButton";

const CounterPage = () => {
    const [count, setCount] = useState<number>(0);

    const handleIncrement = () => {
        setCount(count + 1);
    }
    const handleDecrement = () => {
        setCount(count - 1);
    }
    return (
        <div className="flex flex-col items-center justify-center align-middle">
            <div className="flex gap-2">
                <h2 className="text-xl">Counter: </h2>
                <p className="text-lg text-gray-600">{count}</p>
            </div>
            <div className="border-4 border-gray-200 gap-5 flex">
                <CustomButton label="+" variant="secondary" onClick={handleIncrement}/>
                <CustomButton label="-" variant="secondary" onClick={handleDecrement}/>
            </div>
            <CustomButton label="Reset" variant="primary" onClick={() => setCount(0)}/>
        </div>
    );
};

export default CounterPage;