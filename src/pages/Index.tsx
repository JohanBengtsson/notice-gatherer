
import React from 'react';
import Header from '../components/Header';
import TenderDisplay from '../components/TenderDisplay';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-10 px-4 md:px-6 max-w-5xl mx-auto">
        <section className="mb-8 animate-fade-in">
          <div className="text-center mb-12 pt-8">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              Swedish Public Procurement
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">
              TED Procurement Notices
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse the latest tenders and procurement notices from Swedish public authorities
            </p>
          </div>
          
          <div className="glass-panel rounded-xl p-6 md:p-8">
            <TenderDisplay />
          </div>
        </section>
      </main>
      
      <footer className="py-6 border-t border-border">
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          <p>Data from the EU's Tenders Electronic Daily (TED)</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
