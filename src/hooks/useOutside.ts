import React, { RefObject, useEffect } from "react";

export function useOutside(ref:RefObject<any>, onOutsideClick: () => void) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event:MouseEvent) {
        if (ref.current && !ref.current.contains(event.target)) {
            onOutsideClick()
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }