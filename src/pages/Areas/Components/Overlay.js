export function createOverlay(container, pane, position) {
  class Overlay extends google.maps.OverlayView {
    container;
    pane;
    position;

    constructor(container, pane, position) {
      super();
      this.container = container;
      this.pane = pane;
      this.position = position;
    }

    onAdd() {
      const pane = this.getPanes()?.[this.pane];
      pane?.appendChild(this.container);
    }

    draw() {
      const projection = this.getProjection();
      const point = projection.fromLatLngToDivPixel(this.position);

      if (point === null) {
        return;
      }

      this.container.style.transform = `translate(${point.x}px, ${point.y}px)`;
    }

    onRemove() {
      if (this.container.parentNode !== null) {
        this.container.parentNode.removeChild(this.container);
      }
    }
  }
  return new Overlay(container, pane, position);
}
