import { useState, useEffect } from 'react';

export function useDebounce(search, delay){
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(search), search? delay: 0);
        return () => clearTimeout(handler);
    }, [search, delay]);
    return debouncedSearch;
};