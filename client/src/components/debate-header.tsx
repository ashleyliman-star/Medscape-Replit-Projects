import medscapeLogo from "@assets/Group 6_1756922957897.png";

export default function DebateHeader() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-4">
        <div className="flex justify-center items-center">
          <a href="https://medscape.com" target="_blank" rel="noopener noreferrer">
            <img 
              src={medscapeLogo}
              alt="Medscape" 
              className="h-8 md:h-12 hover:opacity-80 transition-opacity"
            />
          </a>
        </div>
      </div>
    </header>
  );
}