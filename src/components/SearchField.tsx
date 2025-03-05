import {FC} from "react";

interface SearchFieldProps {
    placeholder: string;
    search: string;
    setSearch: (search: string) => void;
}

const SearchField: FC<SearchFieldProps> = ({search, setSearch, placeholder}) => {
    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <input
                type="text"
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 mb-4 w-full rounded mt-8 mb-4 max-w-2xl"
            />
        </div>
    );
};

export default SearchField;
