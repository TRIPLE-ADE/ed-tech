import { useState, useCallback } from "react";

const throttle = (func: Function, delay: number) => {
  let lastCall = 0;
  return (...args: any[]) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func(...args);
  };
};

export const useDragAndDrop = (onFiles: (files: FileList) => void) => {
  const [isDragging, setIsDragging] = useState(false);

  // Throttled version of setIsDragging
  const throttledSetIsDragging = useCallback(
    throttle((dragState: boolean) => setIsDragging(dragState), 300),
    []
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    throttledSetIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    throttledSetIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    onFiles(e.dataTransfer.files);
  };

  return { isDragging, handleDragOver, handleDragLeave, handleDrop };
};
