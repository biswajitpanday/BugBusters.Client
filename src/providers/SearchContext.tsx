import { createContext, useContext, useState } from "react";

interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  showSearchBar: boolean;
  setShowSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}

type SearchProviderProps = {
  children: React.ReactNode;
};

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(true);
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, showSearchBar, setShowSearchBar }}>
      {children}
    </SearchContext.Provider>
  );
};
