import { createFileRoute } from "@tanstack/react-router";

import { ProductionSitePage } from "~/components/ProductionSitePage";

export const Route = createFileRoute("/sites/mama-mia-pizzeria")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductionSitePage slug="mama-mia-pizzeria" />;
}
