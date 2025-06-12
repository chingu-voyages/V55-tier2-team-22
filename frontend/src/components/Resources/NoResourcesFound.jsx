function NoResourcesFound({clearAllFilters, areFiltersUsed}) {
  return (
    <div className="flex flex-col justify-center items-center w-fit mx-auto my-5">
      <h3 className="text-2xl">We didn't find any results</h3>
      <p className="text-center py-4">Try typing in something different, or changing your tags.</p>
      {areFiltersUsed && (
        <>
          <p>Or...</p>
          <button onClick={clearAllFilters} className="text-sm">
            Clear all filters
          </button>
        </>
      )}
    </div>
  );
}

export default NoResourcesFound;
