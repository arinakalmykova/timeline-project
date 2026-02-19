import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TimelineBlock } from "@/widgets";
import "./styles/main.scss";

const periods = [
  {
    id: "1",
    label: "2000-2005",
    events: [
      { id: "e1", title: "Event 1", description: "Description 1", date: "2001" },
      { id: "e2", title: "Event 2", description: "Description 2", date: "2003" },
    ],
  },
  {
    id: "2",
    label: "2006-2010",
    events: [
      { id: "e3", title: "Event 3", description: "Description 3", date: "2007" },
      { id: "e4", title: "Event 4", description: "Description 4", date: "2009" },
    ],
  },
];

export function App () {
  return (
    <StrictMode>
    <div>
      <TimelineBlock periods={periods} />
    </div>
    </StrictMode>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
