import React, { useState } from 'react';

const AutoSuggestInput = ({ suggestions, onSuggestionSelected, value, onChange, name, placeholder }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState(value);

  const handleChange = (e) => {
    const userInput = e.currentTarget.value;
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setUserInput(userInput);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    onChange(e);
  };

  const handleClick = (suggestion) => {
    setFilteredSuggestions([]);
    setUserInput(suggestion.name);
    setShowSuggestions(false);
    onSuggestionSelected(suggestion);
  };

  const renderSuggestions = () => {
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        return (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleClick(suggestion)}
                className="text-sm px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                {suggestion.name} - {suggestion.class}
              </li>
            ))}
          </ul>
        );
      } else {
        return (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            <p className="text-sm px-4 py-2">No suggestions available</p>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        name={name}
        value={userInput}
        onChange={handleChange}
        placeholder={placeholder}
        className="text-sm w-full px-4 py-2 border border-gray-300 rounded-md"
      />
      {renderSuggestions()}
    </div>
  );
};

export default AutoSuggestInput;