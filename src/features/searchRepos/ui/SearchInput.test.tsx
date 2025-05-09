import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SearchInput } from "./SearchInput";

const mockQueryChanged = vi.fn();
const mockPageChanged = vi.fn();

vi.mock("effector-react", () => ({
  useUnit: (arg: unknown) => {
    if (Array.isArray(arg)) {
      return ["", mockQueryChanged, mockPageChanged];
    }
    return vi.fn();
  },
}));

describe("Поле поиска", () => {
  beforeEach(() => {
    mockQueryChanged.mockClear();
    mockPageChanged.mockClear();
  });

  it("вызывает queryChanged и pageChanged при вводе текста", () => {
    render(<SearchInput />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "react" } });

    expect(mockQueryChanged).toHaveBeenCalledWith("react");
    expect(mockPageChanged).toHaveBeenCalledWith(1);
  });
});
