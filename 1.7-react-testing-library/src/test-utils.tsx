import { RenderOptions, render } from "@testing-library/react";
import { Provider } from "jotai";

const AllProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Provider>{children}</Provider>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
