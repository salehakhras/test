import { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";

const ResponsiveSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* For medium screens and up: always show full search */}
      <div className="hidden md:flex items-center shadow-md gap-2 bg-base-300 rounded-full px-5 py-3">
        <MdOutlineSearch className="text-gray-400 size-5" />
        <input
          type="text"
          placeholder="Search for anything here..."
          className="text-gray-500 text-sm focus:outline-none w-full bg-transparent"
        />
      </div>

      {/* On small screens: toggle input with icon */}
      <div className="md:hidden">
        {isOpen ? (
          <div className="flex items-center shadow-md gap-2 bg-base-300 rounded-full px-4 py-2 w-64 transition-all duration-300">
            <MdOutlineSearch className="text-gray-400 size-5" />
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              className="text-gray-500 text-sm focus:outline-none w-full bg-transparent"
              onBlur={() => setIsOpen(false)}
            />
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-ghost p-2"
          >
            <MdOutlineSearch className="text-base-content size-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ResponsiveSearch;