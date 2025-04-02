import { useEffect, useState } from "react";

export function Construction() {
    const [currentText, setCurrentText] = useState("");
    const [index, setIndex] = useState(0);
    const text = "Under construction...";

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentText(text.slice(0, index + 1));
            setIndex(index + 1);

            if (index >= text.length) {
                setIndex(0);
            }
        }, 150);

        return () => clearInterval(interval);
    }, [index]);

    return (
        <div className="flex min-h-screen w-full justify-center items-center text-2xl text-text-muted">
            <div className="flex">
                <span>{currentText}</span>
                <span className="inline-block w-1 h-10 bg-mat-yellow" />
            </div>
        </div>
    );
}
