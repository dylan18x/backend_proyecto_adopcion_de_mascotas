import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "../components/Counter";

describe("Counter", () => {
  test("muestra initial por defecto en 0", () => {
    render(<Counter />);
    expect(screen.getByLabelText("count-value")).toHaveTextContent("0");
  });

  test("muestra initial personalizado", () => {
    render(<Counter initial={5} />);
    expect(screen.getByLabelText("count-value")).toHaveTextContent("5");
  });

  test("incrementa y decrementa con clicks", async () => {
    const user = userEvent.setup();
    render(<Counter initial={1} />);

    await user.click(screen.getByRole("button", { name: "+1" }));
    expect(screen.getByLabelText("count-value")).toHaveTextContent("2");

    await user.click(screen.getByRole("button", { name: "-1" }));
    expect(screen.getByLabelText("count-value")).toHaveTextContent("1");
  });

  test("reset vuelve al initial", async () => {
    const user = userEvent.setup();
    render(<Counter initial={10} />);

    await user.click(screen.getByRole("button", { name: "-1" }));
    expect(screen.getByLabelText("count-value")).toHaveTextContent("9");

    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByLabelText("count-value")).toHaveTextContent("10");
  });
});