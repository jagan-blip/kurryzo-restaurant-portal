import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { createOverlay } from "./Overlay";

export default function OverlayView({
  position,
  pane = "floatPane",
  map,
  zIndex,
  children,
}) {
  const container = useMemo(() => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.transformOrigin = "center"; // Set the transformation origin to the center

    // Apply a scale transformation to the content
    div.style.transform = "scale(2.0)"; // Scale by a factor of 2
    return div;
  }, []);

  const overlay = useMemo(() => {
    return createOverlay(container, pane, position);
  }, [container, pane, position]);

  useEffect(() => {
    overlay?.setMap(map);
    return () => overlay?.setMap(null);
  }, [map, overlay]);

  // to move the container to the foreground and background
  useEffect(() => {
    container.style.zIndex = `${zIndex}`;
  }, [zIndex, container]);

  return createPortal(children, container);
}
