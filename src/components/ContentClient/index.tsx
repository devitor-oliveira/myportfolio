import { useState } from "react";
import Nav from "../Nav";

interface ContentClientProps {
  blogContentSlot?: React.ReactNode;
  projectContentSlot?: React.ReactNode;
}

function ContentClient({
  blogContentSlot,
  projectContentSlot,
}: ContentClientProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "blog">("projects");

  return (
    <div className="max-w-3xl gap-8 items-center p-2 w-full flex flex-col">
      <Nav activeTab={activeTab} handleTabChange={setActiveTab} />

      <div className="w-full flex justify-center p-1">
        {activeTab === "projects" && projectContentSlot}
        {activeTab === "blog" && blogContentSlot}
      </div>
    </div>
  );
}

export default ContentClient;
