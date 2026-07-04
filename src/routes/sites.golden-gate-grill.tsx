import { createFileRoute } from "@tanstack/react-router";

import { ProductionSitePage } from "~/components/ProductionSitePage";

export const Route = createFileRoute("/sites/golden-gate-grill")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductionSitePage slug="golden-gate-grill" />;
}
