import Button from '../ui/Button.tsx';

interface NavProps {
  activeTab: string;
  handleTabChange: (tab: 'projects' | 'blog') => void;
}

function Nav({ activeTab, handleTabChange }: NavProps) {
  return (
    <nav className="flex-center w-full pt-2 pb-4 gap-24 border-b border-border-muted p-2">
      <Button
        isactive={activeTab === 'blog'}
        variant={'tab'}
        onClick={() => handleTabChange('blog')}
      >
        _blogs
      </Button>
      <Button
        isactive={activeTab === 'projects'}
        variant={'tab'}
        onClick={() => handleTabChange('projects')}
      >
        _projects
      </Button>
    </nav>
  );
}

export default Nav;
