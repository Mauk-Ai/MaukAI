import { createFileRoute } from "@tanstack/react-router";

import { ProductionSitePage } from "~/components/ProductionSitePage";

export const Route = createFileRoute("/sites/sunset-smiles-dentistry")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductionSitePage slug="sunset-smiles-dentistry" />;
}
