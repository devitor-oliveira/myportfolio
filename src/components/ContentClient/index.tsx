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
    <div className="max-w-5xl  gap-8 items-center w-full flex flex-col">
      <Nav activeTab={activeTab} handleTabChange={setActiveTab} />

      <div className="w-full flex justify-center ">
        {activeTab === "blog" && blogContentSlot}
        {activeTab === "projects" && projectContentSlot}
      </div>
    </div>
  );
}

export default ContentClient;
