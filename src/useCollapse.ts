// Solution inspired by https://css-tricks.com/using-css-transitions-auto-dimensions/#article-header-id-5

import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from "react";

type Options = {
  timing?: number;
  ease?: "ease" | "ease-in" | "ease-out" | "ease-in-out";
};

const defaultOptions = {
  timing: 0.5,
  ease: "ease-out"
};

/**
 * @description Allows animated collapsing and expanding of an element
 *  that does not have a fixed height
 * @param initialCollapsed true if the element should be collapse in
 *  the initial render; false if it should be expanded - If 'true',
 *  the element needs to have at least the following styles applied
 *  prior to render: { overflow: 'hidden', height: '0' }
 * @param options object to set the animation timing and the ease option
 * @return [ref, collapsed, setCollapsed] - use the ref to attach to
 *  a DOM node. collapsed will be true if collapsed, false otherwise.
 *  setCollapsed will toggle the collapsed state
 */
function useCollapse(
  initialCollapsed: boolean,
  elemRef: MutableRefObject<any>,
  options: Options = {}
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [collapsed, setCollapsed] = useState<boolean>(initialCollapsed);
  const styleOptions = {
    ...defaultOptions,
    ...options
  };

  const elemExists = elemRef.current !== null;

  useEffect(() => {
    if (elemRef.current !== null) {
      elemRef.current.style.overflow = "hidden";

      if (initialCollapsed) {
        elemRef.current.style.height = 0;
      }
    }
  }, [elemExists, initialCollapsed]);

  useEffect(() => {
    const element = elemExists ? (elemRef.current as HTMLElement) : null;
    if (element) {
      element.style.transition = `height ${styleOptions.timing}s ${
        styleOptions.ease
      }`;
      element.style.overflow = "hidden";
    }
  }, [initialCollapsed, styleOptions.timing, styleOptions.ease, elemExists]);

  useEffect(() => {
    const element = elemRef.current ? (elemRef.current as HTMLElement) : null;
    if (element) {
      if (collapsed) {
        collapse(element);
      } else {
        expand(element);
      }
    }
  }, [collapsed]);

  return [collapsed, setCollapsed];
}

function collapse(element: HTMLElement) {
  const elementHeight = element.scrollHeight;
  const elementTransition = element.style.transition;
  element.style.transition = "";

  window.requestAnimationFrame(() => {
    element.style.height = `${elementHeight}px`;
    element.style.transition = elementTransition;

    window.requestAnimationFrame(() => {
      element.style.height = "0px";
    });
  });
}

function expand(element: HTMLElement) {
  function handler() {
    element.style.height = "auto";
  }

  const elementHeight = element.scrollHeight;
  element.style.height = `${elementHeight}px`;

  element.addEventListener("transitionend", handler);
  window.requestAnimationFrame(() => {
    element.removeEventListener("transitionend", handler);
  });
}

export default useCollapse;
