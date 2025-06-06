import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getTags } from "@/util/getResourceData";

// Styles for <Select> component.
// This object is declared outside of this component so it isn't recreated every render, 
// and also since styles are the same between instances of this component.
const dropdownStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "black",
    borderColor: "#05dbf2",
    color: "white",
    margin: "1rem 0",
    maxWidth: "50vw",
    minWidth: "15rem"
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "black",
    color: "white"
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#0a8cbf" : "black",
    color: "white",
    cursor: "pointer"
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#111",
    color: "#04b2d9" // background color
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#04b2d9" // selected tag text color
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#04b2d9",
    ":hover": {
      backgroundColor: "#222",
      color: "#fff"
    }
  }),
  singleValue: (base) => ({
    ...base,
    color: "white"
  }),
  input: (base) => ({
    ...base,
    color: "var(--color-gray-50)"
  }),
  placeholder: (base) => ({
    ...base,
    color: "var(--color-gray-400)"
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: "var(--color-gray-400)"
  })
};

function TagDropdown({ onTagSelect }) {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const tagsData = await getTags();
        setTags(tagsData);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    }
    fetchData();
  }, []);

  const options = tags.map((tag) => ({
    value: tag.tag,
    label: tag.tag
  }));

  const handleChange = (selected) => {
    const selectedValues = selected ? selected.map((option) => option.value) : [];
    setSelectedTags(selectedValues);
    onTagSelect(selectedValues); // Pass selected tag strings to parent
  };

  return (
    <div className="max-w-sm inline-block py-8">
      <label htmlFor="tagDropdown">Search by Tags:</label>

      <Select
        id="tagDropdown"
        isMulti
        options={options}
        value={options.filter((opt) => selectedTags.includes(opt.value))}
        onChange={handleChange}
        placeholder="Select tags..."
        styles={dropdownStyles}
      />
    </div>
  );
}

export default TagDropdown;
