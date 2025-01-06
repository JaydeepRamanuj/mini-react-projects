import { useState } from "react";

function SearchAutocomplete() {
  const [suggestionList, setSuggestionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getSuggestions(e) {
    console.log(e.target.value.length);

    try {
      setIsLoading(true);
      if (e.target.value.length !== 0) {
        const response = await fetch(
          `https://dummyjson.com/users/search?q=${e.target.value}`
        );
        const result = await response.json();
        //   console.log(result.users);
        setSuggestionList(result.users);
        setIsLoading(false);
      } else {
        setSuggestionList([]);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-[300px] mx-auto mt-10">
      <input
        type="text"
        name=""
        id=""
        onInput={getSuggestions}
        placeholder="search here"
        className="border-2 px-3 py-1 rounded-xl w-full"
      />

      <ul className="suggestions-list w-full p-0.5 max-h-96 overflow-auto">
        {suggestionList.map((suggestion, index) => (
          <li
            key={index}
            className="bg-slate-200 rounded mt-0.5 text-start pl-3"
          >
            {suggestion.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchAutocomplete;
