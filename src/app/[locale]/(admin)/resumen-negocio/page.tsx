import { redirect } from "@/navigation";

export default async function ResumenNegocioRedirect() {
  redirect("/dashboard-empresa");
  return null;
}
