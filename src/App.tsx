import "./App.css";
import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { About } from "./About.tsx";
import { Experience } from "./Experience.tsx";
import { Search } from "./Search.tsx";
import { Contact } from "./Contact.tsx";

export default function App() {
    const [searchMode, setSearchMode] = useState<boolean>(true);
    const [selected, setSelected] = useState<number>(0);
    const [page, setPage] = useState<string>("About");

    const buttons = ["About", "Experience", "Contact Me"];

    const handleButtonClick = (text: string, index: number): void => {
        setPage(text);
        setSelected(index);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (!searchMode && event.target instanceof HTMLInputElement) {
                return;
            }

            if (event.key === "k" && event.metaKey) {
                event.preventDefault();
                setSearchMode(true);
            }

            if (event.key === "Escape") {
                setSearchMode(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [searchMode]);

    return searchMode ? (
        <Search />
    ) : (
        <div className="flex flex-col flex-wrap min-h-screen w-full pt-4 pl-4 pr-8 text-text-muted">
            <div className="flex flex-row w-full items-baseline">
                <div className="text-3xl text-white mr-8">Chris Mattinson</div>
                <div className="flex flex-1 justify-end text-xl gap-6 bg-mat-highlight">
                    {buttons.map((button, index) => (
                        <button
                            key={button}
                            className={selected === index ? "button-selected" : ""}
                            type="button"
                            onClick={() => handleButtonClick(button, index)}
                        >
                            {button}
                        </button>
                    ))}
                    <button type="button">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://github.com/cmattinson"
                            className="text-decoration-none"
                        >
                            Github
                        </a>
                    </button>
                    <button type="button">
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://linkedin.com/in/cmattinson"
                            className="text-decoration-none"
                        >
                            LinkedIn
                        </a>
                    </button>
                    <div className="text-lg">⌘ + k</div>
                </div>
            </div>
            {page === "About" ? (
                <About />
            ) : page === "Experience" ? (
                <Experience />
            ) : page === "Contact Me" ? (
                <Contact />
            ) : null}
        </div>
    );
}
