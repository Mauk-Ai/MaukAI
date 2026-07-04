import { createFileRoute } from "@tanstack/react-router";

import { ProductionSitePage } from "~/components/ProductionSitePage";

export const Route = createFileRoute("/sites/chic-cuts-salon")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductionSitePage slug="chic-cuts-salon" />;
}
