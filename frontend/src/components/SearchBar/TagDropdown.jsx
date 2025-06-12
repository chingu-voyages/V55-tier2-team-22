import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getTags } from "@/util/getResourceData";

// Styles for <Select> component.
// This object is declared outside of this component so it isn't recreated every render,
// and also since styles are the same between instances of this component.
const dropdownStyles = {
  control: (base) => ({
    ...base,
    minWidth: "15rem",
    maxWidth: "50vw",
    margin: "1rem 0",
    border: "1px solid var(--color-mono-200)",
    backgroundColor: "var(--color-mono-50)",
    color: "var(--color-mono-950)",
    cursor: "pointer",
    ":hover": {
      borderColor: "var(--color-mono-200)"
    }
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "var(--color-mono-50)"
  }),
  option: (base, {isFocused}) => ({
    ...base,
    backgroundColor: isFocused ? "var(--color-cyan-500)" : "var(--color-mono-50)",
    color: isFocused ? "var(--color-cyan-50) " : "var(--color-mono-950)",
    cursor: "pointer"
  }),
  multiValue: (base) => ({
    ...base,
    paddingLeft: "0.25rem",
    border: "1px solid var(--color-cyan-600)",
    borderRadius: "var(--radius-4xl)",
    backgroundColor: "var(--color-cyan-400)"
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "var(--color-cyan-950)"
  }),
  multiValueRemove: (base) => ({
    ...base,
    borderRadius: "0 var(--radius-4xl) var(--radius-4xl) 0",
    color: "var(--color-cyan-950)",
    ":hover": {
      backgroundColor: "var(--color-cyan-500)"
    }
  }),
  singleValue: (base) => ({
    ...base,
    color: "white"
  }),
  input: (base) => ({
    ...base,
    color: "var(--color-mono-950)"
  }),
  placeholder: (base) => ({
    ...base,
    color: "var(--color-mono-800)"
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: "var(--color-mono-800)"
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: "var(--color-mono-300)"
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "var(--color-mono-500)",
    ":hover": {
      color: "var(--color-mono-800)"
    }
  }),
  clearIndicator: (base) => ({
    ...base,
    color: "var(--color-mono-500)",
    ":hover": {
      color: "var(--color-mono-800)"
    }
  })
};

function TagDropdown({ onTagSelect, selectedTags = [] }) {
  const [tags, setTags] = useState([]);

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
    onTagSelect(selectedValues); // Pass selected tag strings to parent
  };

  return (
    <div>
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
