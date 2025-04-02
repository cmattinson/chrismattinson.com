import { useEffect } from "react";
import { useNavStore } from "./stores/nav";
import { NavLink } from "react-router";

type Button = {
    caption: string;
    href: string;
};

export function Nav() {
    const searchMode = useNavStore((state) => state.searchMode);
    const selected = useNavStore((state) => state.selected);
    const { setSearchMode, setSelected } = useNavStore();

    const navButtons: Button[] = [
        {
            caption: "About",
            href: "/",
        },
        {
            caption: "Experience",
            href: "/experience",
        },
        {
            caption: "Contact Me",
            href: "/contact",
        },
    ];

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
    }, [setSearchMode, searchMode]);

    return (
        <div className="flex flex-row pt-4 pl-4 pr-4 w-full items-baseline">
            <div className="text-3xl text-white mr-8">Chris Mattinson</div>
            <div className="flex flex-1 justify-end text-xl gap-6 items-baseline text-text-muted">
                {navButtons.map((button, index) => (
                    <button
                        key={button.href}
                        className={selected === index ? "button-selected" : ""}
                        type="button"
                        onClick={() => setSelected(index)}
                    >
                        <NavLink to={button.href}>{button.caption}</NavLink>
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
                <div className="flex flex-row gap-2 text-sm">
                    <div className="bg-mat-highlight">⌘</div>
                    <div className="bg-mat-highlight">K</div>
                </div>
            </div>
        </div>
    );
}
