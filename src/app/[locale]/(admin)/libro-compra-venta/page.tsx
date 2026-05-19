"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LibroCompraVentaRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/es/contabilidad/libros/compra-venta");
  }, [router]);
  return null;
}
