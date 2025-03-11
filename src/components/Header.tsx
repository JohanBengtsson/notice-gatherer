
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel py-4 px-6 md:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">EU</span>
          </div>
          <h1 className="text-xl font-medium tracking-tight">
            TED Notices <span className="text-muted-foreground font-normal">Sweden</span>
          </h1>
        </div>
        <div className="text-sm text-muted-foreground">
          <span>Tenders Electronic Daily</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
