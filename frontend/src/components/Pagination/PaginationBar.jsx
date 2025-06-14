import { useEffect, useRef, useState } from "react";
import { computePageIndex, computePageArrangement, doesPageIndexExist } from "@/util/pagination";
import PageButton from "./PageButton.jsx";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { getAbsolutePosition } from "@/util/element";

function PaginationBar({ firstItemIndex, totalItems, pageSize, maxVisiblePageButtons, onChangePage }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(computePageIndex(firstItemIndex, pageSize));
  const [arrangement, setArrangement] = useState(
    computePageArrangement(firstItemIndex, totalItems, pageSize, maxVisiblePageButtons)
  );

  const barEl = useRef(null);
  const [diffBetweenScrollAndElY, setDiffBetweenScrollAndElY] = useState(null);

  function isPageIndexIncluded(pageIndex) {
    return doesPageIndexExist(pageIndex, totalItems, pageSize);
  }

  useEffect(() => {
    setCurrentPageIndex(computePageIndex(firstItemIndex, pageSize));
    setArrangement(computePageArrangement(firstItemIndex, totalItems, pageSize, maxVisiblePageButtons));
  }, [firstItemIndex, pageSize, totalItems, maxVisiblePageButtons]);

  // Ensure the visual distance between the scrollbar and the PaginationBar stays the same
  // between page changes.
  useEffect(() => {
    if (diffBetweenScrollAndElY != null) {
      const { top: elY } = getAbsolutePosition(barEl.current);
      window.scrollTo(0, elY + diffBetweenScrollAndElY);
      // Set to null so that this effect only runs once per page change, and does not run
      // on component mount.
      setDiffBetweenScrollAndElY(null);
    }
  }, [diffBetweenScrollAndElY]);

  function attemptChangePage(pageIndex) {
    const minPage = 0;
    const maxPage = Math.ceil(totalItems / pageSize);

    if (pageIndex >= minPage && pageIndex < maxPage) {
      onChangePage(pageIndex);

      // Record the difference between the bar element's Y position and the scrollbar's
      // Y position. We use this to ensure the visual distance between the two stays the 
      // same between document layout changes caused by the user switching between pages, 
      // and to prevent the "viewport jumping" effect.
      const { top: elY } = getAbsolutePosition(barEl.current);
      setDiffBetweenScrollAndElY(window.scrollY - elY);
    }
  }

  if (arrangement == null) {
    return null;
  }

  return (
    <div ref={barEl} className="w-fit ml-auto mr-auto flex flex-row gap-2 my-4">
      <PageButton
        onClick={() => attemptChangePage(currentPageIndex - 1)}
        isDisabled={!isPageIndexIncluded(currentPageIndex - 1)}
      >
        <FaAngleLeft></FaAngleLeft>
      </PageButton>

      {arrangement.map((n) => {
        return (
          <PageButton
            key={n}
            isCurrent={currentPageIndex === n}
            onClick={() => attemptChangePage(n)}
          >
            {n + 1}
          </PageButton>
        );
      })}

      <PageButton
        onClick={() => attemptChangePage(currentPageIndex + 1)}
        isDisabled={!isPageIndexIncluded(currentPageIndex + 1)}
      >
        <FaAngleRight></FaAngleRight>
      </PageButton>
    </div>
  );
}

export default PaginationBar;
