export type Job = {
    id: number;
    title: string;
    company: string;
    location: string;
    type: "Full-Time" | "Part-Time" | "Contract";
    description: string;
    userId: number; // new field for ownership
};

export const JOBS: Job[] = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Acme Corp",
        location: "Remote",
        type: "Full-Time",
        description: "Build UI components with React and Tailwind.",
        userId: 1,
    },
    {
        id: 2,
        title: "Backend Developer",
        company: "Tech Solutions",
        location: "New York",
        type: "Part-Time",
        description: "Maintain Node.js APIs and databases.",
        userId: 2,
    },
    {
        id: 3,
        title: "Project Manager",
        company: "BuildIt Inc",
        location: "San Francisco",
        type: "Contract",
        description: "Coordinate teams and manage delivery timelines.",
        userId: 1,
    },
];
