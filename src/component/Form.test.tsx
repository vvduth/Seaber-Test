import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Form from "./Form";
import React from "react";
import userEvent from "@testing-library/user-event";

describe("Testing form component", () => {
  test('render "From Location"', () => {
    render(<Form />);
    const fromElement = screen.getByText("From Location", { exact: false });
    expect(fromElement).toBeInTheDocument();
  });

  test("onSubmit is called when all the field pass validation", async () => {
    const onSubmit = jest.fn();
    onSubmit.mockClear();
    render(<Form />);
    user.type(getFromLocation(), "Porvoo");
    user.type(getToLocation(), "Tampere");
    user.type(getCargoType(), "Pasta");
    user.type(getAmount(), "20");
    const button = screen.getByRole("button", {
        name: /submit/i,
      });
    userEvent.click(button);
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        cargoAmount: 20,
        cargoType: "Pasta",
        fromLocation: "Porvoo",
        id: 1,
        toLocation: "Tampere",
      });
    });
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});

function getFromLocation() {
  return screen.getByRole("textbox", {
    name: /from location:/i,
  });
}
function getToLocation() {
  return screen.getByRole("textbox", {
    name: /to location:/i,
  });
}
function getCargoType() {
  return screen.getByRole("textbox", {
    name: /cargo type:/i,
  });
}

function getAmount() {
  return screen.getByRole("spinbutton", {
    name: /amount:/i,
  });
}
