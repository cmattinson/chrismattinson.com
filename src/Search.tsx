import { useState, useEffect, useRef } from "react";
import { useNavStore } from "./stores/nav";
import { useNavigate } from "react-router";

type Href = {
    link: string;
    external: boolean;
};

type SearchItem = {
    icon: string;
    text: string;
    href: Href;
};

export function Search() {
    const [input, setInput] = useState("");
    const [selected, setSelected] = useState(0);
    const navigate = useNavigate();
    const { setSearchMode } = useNavStore();
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchItems, _] = useState<SearchItem[]>([
        {
            icon: "hello",
            text: "experience",
            href: {
                link: "/experience",
                external: false,
            },
        },
        {
            icon: "hello",
            text: "contact",
            href: {
                link: "/experience",
                external: false,
            },
        },
        {
            icon: "hello",
            text: "github",
            href: {
                link: "https://github.com/cmattinson",
                external: true,
            },
        },
        {
            icon: "hello",
            text: "linkedin",
            href: {
                link: "https://linked.com/in/cmattinson",
                external: true,
            },
        },
        {
            icon: "hello",
            text: "dotfiles",
            href: {
                link: "https://github.com/cmattinson/dotfiles",
                external: true,
            },
        },
    ]);

    const filteredItems = searchItems.filter((item) => {
        if (input === "") {
            return true;
        }

        return item.text.toLowerCase().includes(input.toLowerCase());
    });

    useEffect(() => {
        if (selected > filteredItems.length - 1) {
            setSelected(0);
        }
    }, [selected, filteredItems]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.target instanceof HTMLInputElement) {
                if ((event.key === "n" && event.ctrlKey) || event.key === "ArrowDown") {
                    event.preventDefault();

                    if (selected === filteredItems.length - 1) {
                        setSelected(0);
                    } else {
                        setSelected(selected + 1);
                    }
                }

                if ((event.key === "p" && event.ctrlKey) || event.key === "ArrowUp") {
                    event.preventDefault();

                    if (selected === 0) {
                        setSelected(filteredItems.length - 1);
                    } else {
                        setSelected(selected - 1);
                    }
                }

                console.log(event.key);

                if (event.key === "Enter") {
                    if (!filteredItems[selected].href.external) {
                        navigate(filteredItems[selected].href.link);
                        setSearchMode(false);
                    } else {
                        console.log("Navigate to", filteredItems[selected].href);
                    }
                }
            } else {
                return;
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [selected, filteredItems.length, filteredItems[selected]]);

    return (
        <div className="flex justify-center items-center flex-wrap min-h-screen w-full text-text-muted">
            <div className="flex flex-col h-[50rem] w-[50rem] rounded-2xl bg-mat-highlight search-container">
                <div className="flex flex-col mt-5 ml-8 search-items mb-auto gap-1">
                    {filteredItems.map((item, index) => (
                        <div
                            className={index === selected ? "search-value-selected" : ""}
                            key={item.text}
                        >
                            {item.text}
                        </div>
                    ))}
                </div>
                <div className="flex flex-row gap-4 items-baseline">
                    <div className="text-3xl items-center text-mat-yellow mt-auto ml-4 mb-5">›</div>
                    <input
                        ref={inputRef}
                        className="flex text-xl w-full mb-5 mt-auto autofocus search-text"
                        type="text"
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                        value={input}
                    />
                </div>
                <div className="flex flex-row gap-8 items-baseline justify-center mb-2">
                    <div>Navigate: ↑ or ↓</div>
                    <div>Confirm: Enter</div>
                </div>
            </div>
        </div>
    );
}
