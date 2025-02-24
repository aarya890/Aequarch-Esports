import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, Calendar, GamepadIcon, Menu } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-secondary border-b border-muted">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Trophy className="w-8 h-8 text-accent" />
            <span className="text-xl font-bold text-foreground">EsportsHub</span>
          </Link>

          <button
            className="lg:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <nav className={`hidden lg:flex items-center space-x-8`}>
            <NavLinks />
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-secondary border-t border-muted">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <NavLinks />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLinks() {
  return (
    <>
      <Link to="/tournaments" className="flex items-center space-x-2 text-foreground hover:text-accent transition-colors">
        <Trophy className="w-5 h-5" />
        <span>Tournaments</span>
      </Link>
      <Link to="/teams" className="flex items-center space-x-2 text-foreground hover:text-accent transition-colors">
        <Users className="w-5 h-5" />
        <span>Teams</span>
      </Link>
      <Link to="/games" className="flex items-center space-x-2 text-foreground hover:text-accent transition-colors">
        <GamepadIcon className="w-5 h-5" />
        <span>Games</span>
      </Link>
      <Link to="/schedule" className="flex items-center space-x-2 text-foreground hover:text-accent transition-colors">
        <Calendar className="w-5 h-5" />
        <span>Schedule</span>
      </Link>
    </>
  );
}