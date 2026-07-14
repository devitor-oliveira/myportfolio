import { useState } from 'react';
import Nav from '../Nav';

interface ContentClientProps {
  blogContentSlot?: React.ReactNode;
  projectContentSlot?: React.ReactNode;
}

function ContentClient({
  blogContentSlot,
  projectContentSlot,
}: ContentClientProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'blog'>('blog');

  return (
    <div className="max-w-5xl items-center w-full flex flex-col border-green">
      <Nav activeTab={activeTab} handleTabChange={setActiveTab} />

      <div>
        {activeTab === 'blog' && blogContentSlot}
        {activeTab === 'projects' && projectContentSlot}
      </div>
    </div>
  );
}

export default ContentClient;
