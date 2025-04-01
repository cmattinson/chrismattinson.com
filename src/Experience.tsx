type Experience = {
    key: string;
    company: string;
    position: string;
    dates: string;
    responsibilities?: string[];
};

const experiences: Experience[] = [
    {
        key: "vantix-1",
        company: "Vantix Systems Inc.",
        position: "Software Developer II",
        dates: "November 2023 - December 2024",
    },
    {
        key: "method1-2",
        company: "Method 1 Enterprise Software",
        position: "Software Developer II",
        dates: "March 2021 - November 2023",
    },
    {
        key: "method1-1",
        company: "Method 1 Enterprise Software",
        position: "Software Developer I",
        dates: "September 2019 - March 2021",
    },
];

export function Experience() {
    return (
        <div className="flex flex-col gap-2 w-full h-full pl-4 pr-4">
            <h2>Work Experience</h2>
            {experiences.map((experience) => {
                return (
                    <div key={experience.key} className="flex justify-between">
                        <div>{experience.company}</div>
                        <div>{experience.dates}</div>
                    </div>
                );
            })}
        </div>
    );
}
