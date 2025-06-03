import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getTags } from "@/util/getResourceData";

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

  // Styles for react-select component

  const dropdownStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "black",
      borderColor: "#05dbf2",
      color: "white",
      margin: "1rem 0",
      width: "400px"
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
    })
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
