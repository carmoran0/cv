import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("./components/ui/flickering-grid", () => ({
  FlickeringGrid: () => <div data-testid="flickering-grid" />,
}));

vi.mock("./components/ui/ZaragozaMap", () => ({
  ZaragozaMap: () => <div data-testid="zaragoza-map" />,
}));

describe("App", () => {
  it("renders key sections and CV download link", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /sobre mí/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /experiencia/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /proyectos/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /certificaciones/i })).toBeInTheDocument();

    const downloadLink = screen.getByRole("link", { name: /descargar cv/i });
    expect(downloadLink).toHaveAttribute("href", "/CV2026.pdf");
  });

  it("switches topbar language from ES to EN", async () => {
    const user = userEvent.setup();
    render(<App />);

    const enButtons = screen.getAllByRole("button", { name: "EN" });
    await user.click(enButtons[0]);

    await waitFor(() => {
      expect(screen.getAllByRole("link", { name: /download cv/i }).length).toBeGreaterThan(0);
    });
  });
});
