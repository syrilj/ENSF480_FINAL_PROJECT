import React from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
    const location = useLocation();
    const searchResults = location.state?.searchResults || [];

    return (
        <div>
            <h2>Search Results</h2>
            {searchResults.length > 0 ? (
                <ul>
                    {searchResults.map((flight) => (
                        <li key={flight.flightId}>
                            {/* Display flight details as needed */}
                            {flight.flightno}, {flight.from} to {flight.to}, {flight.dept_date}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default SearchResults;
