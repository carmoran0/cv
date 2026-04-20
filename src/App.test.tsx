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

vi.mock("./components/GitHubSection/GitHubSection", () => ({
  default: () => <section data-testid="github-section" />,
}));

describe("App", () => {
  it("renders key sections and CV download link", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /sobre mí/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /experiencia/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /proyectos/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /certificaciones/i })).toBeInTheDocument();
    expect(document.title).toBe("Currículum · Carlos Moreno");

    const downloadLink = screen.getByRole("link", { name: /descargar cv/i });
    expect(downloadLink).toHaveAttribute("href", "/CV2026.pdf");
  });

  it("switches topbar language from ES to EN", async () => {
    const user = userEvent.setup();
    render(<App />);

    const enButton = screen.getAllByRole("button", { name: /cambiar a inglés/i })[0];
    await user.click(enButton);

    await waitFor(() => {
      expect(enButton).toHaveAttribute("aria-pressed", "true");
      expect(document.title).toBe("CV · Carlos Moreno");
    });

    expect(screen.getAllByRole("link", { name: /download cv/i })[0]).toHaveAttribute("href", "/CV2026.pdf");
  });
});
