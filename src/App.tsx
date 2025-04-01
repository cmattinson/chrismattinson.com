import "./App.css";
import { useState } from "react";
import { About } from "./About.tsx";
import { Experience } from "./Experience.tsx";

function App() {
    const [page, setPage] = useState("About");

    return (
        <div className="flex flex-col flex-wrap min-h-screen w-full pt-4 pl-4 pr-8 text-text-muted">
            <div className="flex flex-row w-full items-baseline">
                <div className="text-3xl text-white mr-8">Chris Mattinson</div>
                <div className="flex flex-1 w-9 justify-end mr-8 text-xl gap-6">
                    <button type="button" onClick={() => setPage("About")}>
                        About
                    </button>
                    <button type="button" onClick={() => setPage("Experience")}>
                        Experience
                    </button>
                    <button type="button" onClick={() => setPage("Contact Me")}>
                        Contact Me
                    </button>
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
                </div>
            </div>
            {page === "About" ? <About /> : page === "Experience" ? <Experience /> : null}
        </div>
    );
}

export default App;
