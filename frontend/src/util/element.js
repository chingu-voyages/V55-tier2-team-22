/**
 * Returns the absolute/document-relative position of an element.
 * @param {Element} el 
 * @returns {{left: number, top: number}}
 */
export function getAbsolutePosition(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}
