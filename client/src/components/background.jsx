import React, { useEffect, useRef } from 'react';

function BackgroundGrid() {
  const gridContainerRef = useRef(null);

  useEffect(() => {
    const createGrid = (parent, gridSize) => {
      if (!parent) return; // Ensure parent exists

      const width = parent.offsetWidth;
      const height = parent.offsetHeight;
      const cols = Math.ceil(width / gridSize);
      const rows = Math.ceil(height / gridSize);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const box = document.createElement("div");
          box.classList.add("grid-box");
          box.style.left = col * gridSize + "px";
          box.style.top = row * gridSize + "px";
          parent.appendChild(box);
        }
      }
    };

    const gridOverlay = document.createElement("div");
    gridOverlay.classList.add("grid-overlay");
    if (gridContainerRef.current) {
        gridContainerRef.current.appendChild(gridOverlay);
        createGrid(gridOverlay, 52);
    }

    // Cleanup function (optional, but good practice)
    return () => {
      if (gridContainerRef.current) {
        gridContainerRef.current.innerHTML = ''; // Clear the grid on unmount
      }
    };

  }, []);

  return (
    <div className="background-pattern z-20 fixed h-screen w-screen" ref={gridContainerRef}></div>
  );
}

export default BackgroundGrid;