import { createFileRoute } from "@tanstack/react-router";

import { ProductionSitePage } from "~/components/ProductionSitePage";

export const Route = createFileRoute("/sites/north-beach-trattoria")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductionSitePage slug="north-beach-trattoria" />;
}
