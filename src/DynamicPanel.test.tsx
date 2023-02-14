import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { DynamicPanel, DynamicPanelItem } from "./DynamicPanel";

describe("DynamicPanel", () => {
  it("calls getViewForPath with root when no path specified", () => {
    const fnSpy = jest.fn(() => {
      return <div>Ok</div>;
    });

    const ret = render(<DynamicPanel getViewForPath={fnSpy} />);

    expect(fnSpy).toHaveBeenCalledTimes(1);
    // first argument of first call should be empty array
    expect(fnSpy.mock.calls[0][0]).toEqual([]);
  });

  it("calls getViewForPath again when dynamic item is clicked", () => {
    const getViewForPathSpy = jest.fn();

    const ret = render(
      <DynamicPanel
        getViewForPath={(path, control) => {
          getViewForPathSpy(path, control);
          return (
            <DynamicPanelItem pathKey="item1" control={control}>
              Click me
            </DynamicPanelItem>
          );
        }}
      />
    );

    expect(getViewForPathSpy).toHaveBeenCalledTimes(1);

    fireEvent(screen.getByText("Click me"));

    expect(getViewForPathSpy).toHaveBeenCalledTimes(2);

    // first argument of first call should be empty array
    expect(getViewForPathSpy.mock.calls[1][0]).toEqual(["item1"]);
  });
});
