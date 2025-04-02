import "./App.css";
import { About } from "./About.tsx";
import { Experience } from "./Experience.tsx";
import { Search } from "./Search.tsx";
import { Contact } from "./Contact.tsx";
import { useNavStore } from "./stores/nav.ts";
import { Nav } from "./Nav.tsx";
import { Routes, Route } from "react-router";
import { Construction } from "./Construction.tsx";

export default function App() {
    const searchMode = useNavStore((state) => state.searchMode);

    return import.meta.env.PROD ? (
        <Construction />
    ) : searchMode ? (
        <Search />
    ) : (
        <div className="flex flex-col flex-wrap min-h-screen w-full pt-4 pl-4 pr-8">
            <Nav />
            <div className="main pt-10 pl-4 pr-4 text-lg text-text-muted">
                <Routes>
                    <Route path="/" element={<About />} />
                </Routes>
                <Routes>
                    <Route path="/experience" element={<Experience />} />
                </Routes>
                <Routes>
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </div>
    );
}
