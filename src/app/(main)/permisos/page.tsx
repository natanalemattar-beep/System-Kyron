
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, PlusCircle, Download, RefreshCw, Eye, CheckCircle, FileUp, Info, DollarSign, Mail, MessageSquare, Send, Gavel, Stamp, FileEdit, BookOpen, Link as LinkIcon, Newspaper, UserCog, Calendar, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { FileInputTrigger } from "@/components/file-input-trigger";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Clock,
    Route,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const initialPermisos = [
    // --- Ministerios - Petróleo y Minería ---
    { id: "PERM-PET-001", tipo: "Transporte Terrestre de Hidrocarburos", emisor: "Min. Petróleo (MINPET)", fechaEmision: "2024-01-10", fechaVencimiento: "2025-01-10", estado: "Vigente", requisitosInscripcion: ["Copia del RIF", "Registro Mercantil", "Póliza de Seguro de Responsabilidad Civil"], requisitosRenovacion: ["Solvencia de pago de impuestos", "Inspección técnica vehicular vigente"] },
    { id: "PERM-PET-002", tipo: "Transporte Acuático de Hidrocarburos", emisor: "Min. Petróleo (MINPET)", fechaEmision: "2024-02-15", fechaVencimiento: "2025-02-15", estado: "Vigente", requisitosInscripcion: ["Documento de Propiedad o Contrato de Arrendamiento de la embarcación", "Matrícula de la embarcación", "Certificado de seguridad emitido por el INEA"], requisitosRenovacion: ["Inspección de seguridad actualizada", "Solvencia del INEA"] },
    { id: "PERM-PET-003", tipo: "Distribución de Lubricantes Terminados", emisor: "Min. Petróleo (MINPET)", fechaEmision: "2023-08-01", fechaVencimiento: "2024-08-01", estado: "Por Vencer", requisitosInscripcion: ["Licencia de Actividades Económicas (donde aplique)", "Memoria Descriptiva de las instalaciones de almacenamiento", "Permiso de Bomberos"], requisitosRenovacion: ["Declaración de volúmenes de venta del período anterior"] },
    { id: "PERM-PET-004", tipo: "Distribución de Derivados de Hidrocarburos", emisor: "Min. Petróleo (MINPET)", fechaEmision: "2024-04-05", fechaVencimiento: "2025-04-05", estado: "Vigente", requisitosInscripcion: ["RIF vigente", "Acta Constitutiva de la empresa", "Permiso de Almacenamiento (si aplica)"], requisitosRenovacion: ["Solvencia fiscal (SENIAT)"] },
    { id: "PERM-PET-005", tipo: "Suministro y Almacenamiento de Gas", emisor: "Min. Petróleo (MINPET)", fechaEmision: "2024-05-20", fechaVencimiento: "2026-05-20", estado: "Vigente", requisitosInscripcion: ["Estudio de impacto ambiental", "Certificación de seguridad industrial", "Plan de emergencia y contingencia"], requisitosRenovacion: ["Auditoría de seguridad anual"] },
    { id: "PERM-PET-006", tipo: "Actualización de Industrialización de LGN", emisor: "Min. Petróleo (MINPET)", fechaEmision: "2024-06-11", fechaVencimiento: "2025-06-11", estado: "Vigente", requisitosInscripcion: ["Informe técnico del proyecto de actualización", "Flujograma de procesos", "Balance de masa y energía proyectado"], requisitosRenovacion: ["Informe de ejecución del proyecto"] },
    { id: "PERM-PET-007", tipo: "Registro para Industrialización de Refinación", emisor: "Min. Petróleo (MINPET)", fechaEmision: "2024-07-12", fechaVencimiento: "2025-07-12", estado: "Vigente", requisitosInscripcion: ["Proyecto de factibilidad técnico-económica", "Descripción de la tecnología a utilizar", "Permisos ambientales preliminares"], requisitosRenovacion: ["Presentación de avances del proyecto"] },
    { id: "PERM-MIN-001", tipo: "Desarrollo Minero Ecológico", emisor: "Min. Desarrollo Minero Ecológico", fechaEmision: "2024-03-10", fechaVencimiento: "2026-03-10", estado: "Vigente", requisitosInscripcion: ["Estudio de Impacto Ambiental y Sociocultural", "Plan de Explotación y Cierre de Minas", "Garantías financieras para la remediación ambiental"], requisitosRenovacion: ["Informe de cumplimiento de planes ambientales"] },

    // --- Ministerios - Comercio e Industria ---
    { id: "PERM-COM-001", tipo: "Licencia de Importación", emisor: "Min. Comercio", fechaEmision: "2024-07-01", fechaVencimiento: "2024-12-31", estado: "Vigente", requisitosInscripcion: ["RIF Vigente", "Registro en el RUSAD", "Factura Proforma", "Documento de Transporte (BL/AWB)"], requisitosRenovacion: ["Actualización de la declaración de necesidad de importación"] },
    { id: "PERM-COM-002", tipo: "Licencia de Exportación", emisor: "Min. Comercio", fechaEmision: "2024-06-15", fechaVencimiento: "2024-12-15", estado: "Vigente", requisitosInscripcion: ["Certificado de Origen", "Factura Comercial", "Declaración Única de Aduanas (DUA)"], requisitosRenovacion: [] },
    { id: "PERM-COM-003", tipo: "Certificado de No Producción Nacional (CNP)", emisor: "Min. Comercio", fechaEmision: "2024-07-22", fechaVencimiento: "2025-01-22", estado: "Vigente", requisitosInscripcion: ["Solicitud formal con descripción técnica del bien", "Estudio de mercado que demuestre la no existencia de producción nacional"], requisitosRenovacion: [] },

    // --- Ministerios - Salud y Trabajo ---
    { id: "PERM-SAL-001", tipo: "Permiso Sanitario de Funcionamiento", emisor: "MPPS / SACS", fechaEmision: "2024-01-15", fechaVencimiento: "2025-01-15", estado: "Vigente", requisitosInscripcion: ["RIF vigente", "Permiso de Bomberos", "Planos del local o establecimiento", "Copia de la C.I. del representante legal"], requisitosRenovacion: ["Certificado de fumigación vigente", "Solvencia de tasas sanitarias"] },
    { id: "PERM-SAL-002", tipo: "Registro Sanitario de Producto", emisor: "MPPS / SACS", fechaEmision: "2022-11-11", fechaVencimiento: "2027-11-11", estado: "Vigente", requisitosInscripcion: ["Análisis físico-químico y microbiológico del producto", "Proyecto de etiqueta", "Certificado de Libre Venta del país de origen (si es importado)"], requisitosRenovacion: ["Análisis actualizados del producto"] },
    { id: "PERM-SAL-003", tipo: "Certificado de Fumigación", emisor: "MPPS / SACS", fechaEmision: "2024-07-01", fechaVencimiento: "2025-01-01", estado: "Vigente", requisitosInscripcion: ["RIF del establecimiento", "Contratación de empresa de fumigación autorizada"], requisitosRenovacion: [] },
    { id: "PERM-SAL-004", tipo: "Permiso de Manipulación de Alimentos", emisor: "MPPS / SACS", fechaEmision: "2024-06-01", fechaVencimiento: "2025-06-01", estado: "Vigente", requisitosInscripcion: ["Asistencia al curso de manipulación de alimentos", "Exámenes médicos (Certificado de Salud)", "Copia de la C.I."], requisitosRenovacion: ["Curso de actualización (si aplica)"] },
    { id: "PERM-SAL-005", tipo: "Conformidad Sanitaria de Habitabilidad", emisor: "MPPS / SACS", fechaEmision: "2024-02-10", fechaVencimiento: "2025-02-10", estado: "Vigente", requisitosInscripcion: ["Inspección sanitaria del inmueble", "Planos arquitectónicos", "Permiso de construcción"], requisitosRenovacion: ["Inspección anual"] },
    { id: "PERM-SAL-006", tipo: "Registro de Establecimiento de Salud", emisor: "MPPS / SACS", fechaEmision: "2024-01-20", fechaVencimiento: "2029-01-20", estado: "Vigente", requisitosInscripcion: ["RIF de la clínica u hospital", "Nómina de médicos y personal de salud", "Permiso de Bomberos", "Planos de la edificación"], requisitosRenovacion: [] },
    { id: "PERM-TRA-001", tipo: "Acreditación en INPSASEL", emisor: "INPSASEL", fechaEmision: "2023-01-18", fechaVencimiento: "2025-01-18", estado: "Vigente", requisitosInscripcion: ["Registro en el portal del INPSASEL", "Programa de Seguridad y Salud en el Trabajo", "Elección de delegados de prevención"], requisitosRenovacion: ["Declaración Trimestral de Accidentes y Enfermedades Ocupacionales", "Informes del Comité de Seguridad y Salud Laboral"] },

    // --- Ministerios - Sectoriales Diversos ---
    { id: "PERM-CONS-001", tipo: "Permiso de Construcción de Obra Civil", emisor: "Min. Obras Públicas", fechaEmision: "2024-02-01", fechaVencimiento: "2026-02-01", estado: "Vigente", requisitosInscripcion: ["Planos del proyecto visados por un ingeniero", "Estudio de impacto ambiental", "Permiso municipal (Ingeniería Municipal)"], requisitosRenovacion: ["Informe de avance de obra"] },
    { id: "PERM-CONS-002", tipo: "Permiso de Desmantelamiento de Instalaciones", emisor: "Min. Obras Públicas", fechaEmision: "2024-03-18", fechaVencimiento: "2024-09-18", estado: "Por Vencer", requisitosInscripcion: ["Plan de desmantelamiento y manejo de desechos", "Estudio de impacto ambiental", "Solvencia laboral"], requisitosRenovacion: [] },
    { id: "PERM-ECO-001", tipo: "Registro de Actividades (RACDA)", emisor: "Min. Ecosocialismo (MINEC)", fechaEmision: "2023-09-05", fechaVencimiento: "2024-09-05", estado: "Por Vencer", requisitosInscripcion: ["Descripción de la actividad económica", "Listado de sustancias químicas o materiales utilizados (si aplica)"], requisitosRenovacion: ["Declaración anual de actividades"] },
    { id: "PERM-TUR-001", tipo: "Licencia de Turismo", emisor: "Min. Turismo (MINTUR)", fechaEmision: "2024-01-25", fechaVencimiento: "2025-01-25", estado: "Vigente", requisitosInscripcion: ["Registro en el RTN (Registro Turístico Nacional)", "Permiso Sanitario", "Conformidad de Uso de Bomberos"], requisitosRenovacion: ["Solvencia de contribución especial de turismo (1%)"] },
    { id: "PERM-TUR-002", tipo: "Inscripción en Marca País", emisor: "Min. Turismo (MINTUR)", fechaEmision: "2024-07-26", fechaVencimiento: "2026-07-26", estado: "Vigente", requisitosInscripcion: ["Portafolio de productos o servicios que representen a Venezuela", "Acta Constitutiva", "Certificado de calidad (si aplica)"], requisitosRenovacion: [] },
    { id: "PERM-EDU-001", tipo: "Conformidad de Uso Educativo", emisor: "Min. Educación", fechaEmision: "2023-09-01", fechaVencimiento: "2028-09-01", estado: "Vigente", requisitosInscripcion: ["Proyecto pedagógico", "Planos de la institución", "Nómina del personal docente"], requisitosRenovacion: ["Inspección periódica de la Zona Educativa"] },
    { id: "PERM-CUL-001", tipo: "Asignación de ISBN", emisor: "CENAL", fechaEmision: "2024-04-20", fechaVencimiento: "N/A", estado: "Vigente", requisitosInscripcion: ["Formulario de solicitud de ISBN", "Maqueta o borrador de la publicación"], requisitosRenovacion: [] },
    { id: "PERM-CUL-002", tipo: "Certificado de Patrimonio Cultural", emisor: "Min. Cultura (MPPC)", fechaEmision: "2023-12-01", fechaVencimiento: "Indefinido", estado: "Vigente", requisitosInscripcion: ["Justificación del valor cultural del bien", "Informe técnico histórico o artístico"], requisitosRenovacion: [] },
    { id: "PERM-DEP-001", tipo: "Registro Nacional del Deporte", emisor: "Min. Deporte", fechaEmision: "2024-04-12", fechaVencimiento: "2026-04-12", estado: "Vigente", requisitosInscripcion: ["Registro de atletas y entrenadores", "Estatutos del club o asociación deportiva"], requisitosRenovacion: ["Informe de actividades deportivas anual"] },
    { id: "PERM-PES-001", tipo: "Registro de Empresas de Pesca", emisor: "Min. Pesca y Acuicultura", fechaEmision: "2024-05-14", fechaVencimiento: "2025-05-14", estado: "Vigente", requisitosInscripcion: ["Permisos de embarcaciones (si aplica)", "Lista de artes de pesca a utilizar"], requisitosRenovacion: ["Declaración de captura y producción"] },
    
    // --- Permisos Municipales ---
    { id: "PERM-MUN-001", tipo: "Licencia de Actividades Económicas", emisor: "Alcaldía Municipal", fechaEmision: "2024-03-01", fechaVencimiento: "2025-03-01", estado: "Vigente", requisitosInscripcion: ["RIF vigente", "Certificado de Uso Conforme o Zonificación", "Conformidad de Uso de Bomberos"], requisitosRenovacion: ["Declaración de Ingresos Brutos del año anterior", "Solvencia de impuestos municipales"] },
    { id: "PERM-MUN-002", tipo: "Conformidad de Uso de Bomberos", emisor: "Cuerpo de Bomberos", fechaEmision: "2023-08-20", fechaVencimiento: "2024-08-20", estado: "Por Vencer", requisitosInscripcion: ["Inspección técnica de seguridad", "Plan de emergencia y evacuación", "Certificado de operatividad de extintores"], requisitosRenovacion: ["Inspección anual", "Recarga de extintores"] },
    { id: "PERM-MUN-003", tipo: "Certificado de Uso Conforme", emisor: "Alcaldía Municipal", fechaEmision: "2024-03-01", fechaVencimiento: "2025-03-01", estado: "Vigente", requisitosInscripcion: ["Documento de propiedad o contrato de arrendamiento del inmueble", "RIF de la empresa"], requisitosRenovacion: [] },
    { id: "PERM-MUN-004", tipo: "Certificado de Uso de Suelo (Zonificación)", emisor: "Alcaldía Municipal", fechaEmision: "2024-03-01", fechaVencimiento: "2025-03-01", estado: "Vigente", requisitosInscripcion: ["Documento de propiedad o contrato de arrendamiento", "Descripción de la actividad a desarrollar"], requisitosRenovacion: [] },

    // --- Entes Reguladores y Profesionales ---
    { id: "PERM-REG-001", tipo: "Permiso Sanitario para Funerarias", emisor: "MPPS / SACS", fechaEmision: "2024-01-20", fechaVencimiento: "2025-01-20", estado: "Vigente", requisitosInscripcion: ["RIF de la funeraria", "Planos del local con áreas designadas (preparación, velación)", "Inspección Sanitaria"], requisitosRenovacion: ["Certificado de fumigación"] },
    { id: "PERM-REG-002", tipo: "Autorización de Empresa de Seguros", emisor: "SUDEASEG", fechaEmision: "2023-05-10", fechaVencimiento: "2025-05-10", estado: "Vigente", requisitosInscripcion: ["Capital mínimo suscrito y pagado", "Estatutos sociales de la empresa", "Nómina de directores y credenciales"], requisitosRenovacion: ["Publicación de Estados Financieros auditados"] },
    { id: "PERM-REG-003", tipo: "Licencia de Institución Financiera", emisor: "SUDEBAN", fechaEmision: "2022-11-15", fechaVencimiento: "2027-11-15", estado: "Vigente", requisitosInscripcion: ["Estudio de viabilidad económica", "Manuales de organización, procedimientos y control interno", "Origen de los fondos del capital"], requisitosRenovacion: ["Auditorías periódicas de SUDEBAN"] },
    { id: "PERM-PRO-001", tipo: "Inscripción en Colegio de Médicos", emisor: "Colegios Profesionales", fechaEmision: "2020-02-10", fechaVencimiento: "Indefinido", estado: "Vigente", requisitosInscripcion: ["Título universitario registrado y protocolizado", "Cédula de identidad", "Pago de aranceles de inscripción"], requisitosRenovacion: ["Solvencia anual"] },
    { id: "PERM-PRO-002", tipo: "Inscripción en Colegio de Ingenieros (CIV)", emisor: "Colegios Profesionales", fechaEmision: "2019-07-22", fechaVencimiento: "Indefinido", estado: "Vigente", requisitosInscripcion: ["Título de Ingeniero registrado", "Cédula de identidad", "Pago de tasas"], requisitosRenovacion: ["Solvencia anual"] },
    { id: "PERM-PRO-003", tipo: "Inscripción en Colegio de Contadores Públicos", emisor: "Colegios Profesionales", fechaEmision: "2019-07-22", fechaVencimiento: "Indefinido", estado: "Vigente", requisitosInscripcion: ["Título universitario", "Inscripción en el INPRECONTAD"], requisitosRenovacion: ["Solvencia anual del colegio y del INPRECONTAD"] },
    { id: "PERM-PRO-004", tipo: "Inscripción en INPREABOGADO", emisor: "Colegios Profesionales", fechaEmision: "2018-05-30", fechaVencimiento: "Indefinido", estado: "Vigente", requisitosInscripcion: ["Título de abogado registrado", "Inscripción en el Colegio de Abogados respectivo"], requisitosRenovacion: ["Pago de cuotas de sostenimiento"] },

    // --- SAPI ---
    { id: "PERM-SAPI-001", tipo: "Registro de Marca", emisor: "SAPI", fechaEmision: "2022-01-10", fechaVencimiento: "2032-01-10", estado: "Vigente", requisitosInscripcion: ["Búsqueda fonética y gráfica de antecedentes", "Diseño del logo en formato JPG/PNG", "Pago de tasas"], requisitosRenovacion: ["Pago de tasa de renovación cada 10 años"] },
    { id: "PERM-SAPI-INV-001", tipo: "Examen de Solicitud de Patente de Invención", emisor: "SAPI", fechaEmision: "2023-05-20", fechaVencimiento: "2024-11-20", estado: "Vigente", requisitosInscripcion: ["Formulario de solicitud (FP-01)", "Memoria descriptiva del invento", "Reivindicaciones", "Dibujos técnicos", "Resumen", "Comprobante de pago de la tasa"], requisitosRenovacion: ["Pago de anualidades para mantener la patente vigente"] },
    { id: "PERM-SAPI-MOD-001", tipo: "Patente de Modelo de Utilidad", emisor: "SAPI", fechaEmision: "2023-08-15", fechaVencimiento: "2033-08-15", estado: "Vigente", requisitosInscripcion: ["Formulario de solicitud", "Descripción del modelo", "Dibujos del modelo", "Comprobante de pago"], requisitosRenovacion: ["Pago de anualidades"] },
    { id: "PERM-SAPI-DIS-001", tipo: "Patente de Diseño Industrial", emisor: "SAPI", fechaEmision: "2024-02-10", fechaVencimiento: "2034-02-10", estado: "Vigente", requisitosInscripcion: ["Formulario de solicitud", "Reproducciones gráficas o fotográficas del diseño", "Descripción", "Comprobante de pago"], requisitosRenovacion: ["Pago de anualidades"] },
    { id: "PERM-SAPI-DA-001", tipo: "Registro de Derecho de Autor", emisor: "SAPI", fechaEmision: "2023-03-05", fechaVencimiento: "Vitalicio", estado: "Vigente", requisitosInscripcion: ["Ejemplar de la obra a registrar", "Formulario de solicitud", "Comprobante de pago de tasas"], requisitosRenovacion: [] },
    { id: "PERM-SAPI-002", tipo: "Solicitud de Resguardo Temporal de la Invención", emisor: "SAPI", fechaEmision: "", fechaVencimiento: "", estado: "Nuevo", requisitosInscripcion: ["Formulario de solicitud", "Descripción de la invención", "Comprobante de pago"], requisitosRenovacion: [] },
    { id: "PERM-SAPI-003", tipo: "Habilitación de Respuesta de Oposiciones", emisor: "SAPI", fechaEmision: "", fechaVencimiento: "", estado: "Nuevo", requisitosInscripcion: ["Escrito de contestación a la oposición", "Pruebas que sustenten la contestación", "Pago de la tasa correspondiente"], requisitosRenovacion: [] },
    { id: "PERM-SAPI-004", tipo: "Habilitación de Renovaciones y Cambios", emisor: "SAPI", fechaEmision: "", fechaVencimiento: "", estado: "Nuevo", requisitosInscripcion: ["Solicitud de renovación/cambio", "Documento de registro original", "Pago de tasas"], requisitosRenovacion: [] },
    { id: "PERM-SAPI-005", tipo: "Consulta de Expedientes", emisor: "SAPI", fechaEmision: "", fechaVencimiento: "", estado: "Nuevo", requisitosInscripcion: ["Número de expediente", "Identificación del solicitante", "Pago de tasa de consulta"], requisitosRenovacion: [] },
    { id: "PERM-SAPI-006", tipo: "Actualización de Agentes de Propiedad Industrial", emisor: "SAPI", fechaEmision: "", fechaVencimiento: "", estado: "Nuevo", requisitosInscripcion: ["Planilla de actualización de datos", "Documentos que soporten los cambios"], requisitosRenovacion: [] },
    { id: "PERM-SAPI-007", tipo: "Solicitud del Estado Administrativo Actualizado", emisor: "SAPI", fechaEmision: "", fechaVencimiento: "", estado: "Nuevo", requisitosInscripcion: ["Identificación del expediente", "Pago de tasa"], requisitosRenovacion: [] },
    { id: "PERM-SAPI-008", tipo: "Contestación a devolución de forma", emisor: "SAPI", fechaEmision: "", fechaVencimiento: "", estado: "Nuevo", requisitosInscripcion: ["Escrito de subsanación", "Documentos corregidos"], requisitosRenovacion: [] },
    { id: "PERM-SAPI-009", tipo: "Recurso de Reconsideración", emisor: "SAPI", fechaEmision: "", fechaVencimiento: "", estado: "Nuevo", requisitosInscripcion: ["Escrito del recurso", "Argumentos y pruebas", "Pago de tasa"], requisitosRenovacion: [] },
    { id: "PERM-SAPI-010", tipo: "Certificado de Registro de Marca", emisor: "SAPI", fechaEmision: "", fechaVencimiento: "", estado: "Nuevo", requisitosInscripcion: ["Número de registro de la marca", "Pago de tasa de certificación"], requisitosRenovacion: [] },
    { id: "PERM-SAPI-011", tipo: "Pago de Derechos de Registro", emisor: "SAPI", fechaEmision: "", fechaVencimiento: "", estado: "Nuevo", requisitosInscripcion: ["Número de solicitud o registro", "Monto a pagar según tarifa", "Comprobante de pago"], requisitosRenovacion: [] },
    { id: "PERM-SAPI-012", tipo: "Publicación en Prensa Digital SAPI", emisor: "SAPI", fechaEmision: "", fechaVencimiento: "", estado: "Nuevo", requisitosInscripcion: ["Extracto de la marca o patente", "Pago de la tarifa de publicación"], requisitosRenovacion: [] },


    // --- Entes Nacionales y Registros Obligatorios ---
    { id: "REG-MERC-001", tipo: "Registro Mercantil", emisor: "SAREN", fechaEmision: "2020-01-05", fechaVencimiento: "Indefinido", estado: "Vigente", requisitosInscripcion: ["Acta Constitutiva Visada", "Cédulas de los socios", "Pago de tasas"], requisitosRenovacion: ["Actualización de Actas de Asamblea"] },
    { id: "PERM-NAC-001", tipo: "Inscripción Patronal en el IVSS", emisor: "IVSS", fechaEmision: "2020-01-10", fechaVencimiento: "Indefinido", estado: "Vigente", requisitosInscripcion: ["Formulario 14-01", "RIF de la empresa", "Cédula del representante legal"], requisitosRenovacion: [] },
    { id: "PERM-NAC-002", tipo: "Inscripción en BANAVIH (FAOV)", emisor: "BANAVIH", fechaEmision: "2020-01-10", fechaVencimiento: "Indefinido", estado: "Vigente", requisitosInscripcion: ["Registro en el sistema FAOV en Línea", "RIF", "Carga de la nómina de trabajadores"], requisitosRenovacion: [] },
    { id: "PERM-NAC-003", tipo: "Habilitación Postal", emisor: "CONATEL", fechaEmision: "2021-06-01", fechaVencimiento: "2024-06-01", estado: "Vencido", requisitosInscripcion: ["Registro como operador postal", "Descripción de los servicios a prestar"], requisitosRenovacion: ["Solvencia de pago de tasas postales"] },
    { id: "PERM-NAC-004", tipo: "Registro Nacional de Contratistas (RNC)", emisor: "SNC", fechaEmision: "2024-07-10", fechaVencimiento: "2025-07-10", estado: "Vigente", requisitosInscripcion: ["Estados Financieros visados", "Solvencia Laboral (IVSS, BANAVIH, INCES)", "Acta Constitutiva"], requisitosRenovacion: ["Actualización anual de estados financieros"] },
    { id: "PERM-NAC-005", tipo: "Inscripción en el RNA (CONALOT)", emisor: "Min. Trabajo (MPPPST)", fechaEmision: "2020-02-01", fechaVencimiento: "Indefinido", estado: "Vigente", requisitosInscripcion: ["Registro en el sistema RNET", "RIF", "Nómina de trabajadores"], requisitosRenovacion: ["Actualización trimestral de la nómina"] },
    { id: "PERM-NAC-006", tipo: "Inscripción en el RESQUIMC", emisor: "ONA", fechaEmision: "2024-05-15", fechaVencimiento: "2025-05-15", estado: "Vigente", requisitosInscripcion: ["Listado de sustancias químicas controladas a utilizar", "Plan de manejo y seguridad"], requisitosRenovacion: ["Declaración de uso y existencias"] },
    { id: "PERM-NAC-007", tipo: "Registro de Empresas de Producción Social (EPS)", emisor: "Min. Comunas", fechaEmision: "2023-08-20", fechaVencimiento: "2024-08-20", estado: "Por Vencer", requisitosInscripcion: ["Acta constitutiva de la EPS", "Proyecto socio-productivo"], requisitosRenovacion: ["Informe de gestión y reinversión social"] },
    { id: "PERM-NAC-008", tipo: "Inscripción en el RUPDAE", emisor: "SUNDDE", fechaEmision: "2024-02-10", fechaVencimiento: "2025-02-10", estado: "Vigente", requisitosInscripcion: ["Estructura de costos de los productos", "RIF"], requisitosRenovacion: ["Actualización de estructuras de costos"] },
    { id: "PERM-NAC-009", tipo: "Concesión de Espectro Radioeléctrico", emisor: "CONATEL", fechaEmision: "2023-03-20", fechaVencimiento: "2028-03-20", estado: "Vigente", requisitosInscripcion: ["Proyecto técnico de la red a desplegar", "Estudio de factibilidad económica", "Garantía de cumplimiento"], requisitosRenovacion: ["Pago de tasas anuales", "Informe de uso del espectro"] },
    { id: "PERM-NAC-010", tipo: "Licencia de Proveedor de Servicios de Internet (ISP)", emisor: "CONATEL", fechaEmision: "2023-04-01", fechaVencimiento: "2028-04-01", estado: "Vigente", requisitosInscripcion: ["Acta Constitutiva con objeto social adecuado", "Proyecto técnico detallado", "Solvencia fiscal"], requisitosRenovacion: ["Actualización de la información técnica", "Pago de tasas regulatorias"] },
    { id: "PERM-NAC-011", tipo: "Declaración de Aduanas (Nacionalización)", emisor: "SENIAT", fechaEmision: "2024-07-25", fechaVencimiento: "N/A", estado: "Vigente", requisitosInscripcion: ["Factura Comercial", "Documento de Transporte (BL/AWB)", "Licencia de Importación (si aplica)", "Certificado de Origen"], requisitosRenovacion: [] },
    { id: "PERM-NAC-012", tipo: "Inscripción Militar Obligatoria (Empresa)", emisor: "Min. Defensa", fechaEmision: "2020-01-15", fechaVencimiento: "Indefinido", estado: "Vigente", requisitosInscripcion: ["RIF", "Nómina de trabajadores en edad militar"], requisitosRenovacion: ["Actualización anual de la nómina"] },
    { id: "PERM-NAC-013", tipo: "Inscripción y Aporte a FONACIT", emisor: "FONACIT", fechaEmision: "2024-04-30", fechaVencimiento: "2025-04-30", estado: "Vigente", requisitosInscripcion: ["Declaración de Ingresos Brutos del ejercicio anterior", "Pago del aporte correspondiente"], requisitosRenovacion: ["Nueva declaración y pago anual"] },
    { id: "PERM-NAC-014", tipo: "Inscripción y Aporte a FONA", emisor: "ONA", fechaEmision: "2024-04-30", fechaVencimiento: "2025-04-30", estado: "Vigente", requisitosInscripcion: ["Declaración de Utilidades del ejercicio anterior", "Pago del 1% sobre la Utilidad Operativa (para empresas > 50 trabajadores)"], requisitosRenovacion: ["Nueva declaración y pago anual"] },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Vigente: "default",
  "Por Vencer": "secondary",
  Vencido: "destructive",
  "En Renovación": "outline",
  "Nuevo": "outline",
};

const formatDate = (dateString: string) => {
    if (!dateString || dateString === "N/A" || dateString === "Indefinido" || dateString === "Vitalicio") return dateString;
    const date = new Date(dateString);
    // Add timezone offset to prevent date from changing
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

type Payment = {
    id: number;
    fecha: string;
    monto: number;
    referencia: string;
};

type Permiso = typeof initialPermisos[0];

// Function to generate specific letter content
const getLetterContent = (permiso: Permiso | null): string => {
    if (!permiso) return "";

    const fechaActual = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
    const baseContent = `
Ciudad, ${fechaActual}

Señores
${permiso.emisor}
Presente.-

Asunto: Solicitud de Permiso - ${permiso.tipo}

Por medio de la presente, [Nombre del Representante Legal], en mi carácter de Representante Legal de la empresa [Nombre de la Empresa], C.A., RIF [RIF de la Empresa], me dirijo a ustedes con el debido respeto para solicitar formalmente la tramitación y otorgamiento del permiso de "${permiso.tipo}".
`;

    let recaudosContent = '';
    switch (permiso.id) {
        case 'PERM-SAPI-001': // Registro de Marca
            recaudosContent = `
Adjunto a la presente, consignamos los siguientes recaudos:
- Resultados de la búsqueda de antecedentes fonéticos.
- Resultados de la búsqueda de antecedentes gráficos.
- Diseño del logo propuesto en formato digital (JPG/PNG).
- Comprobante de pago de las tasas correspondientes.
`;
            break;
        case 'PERM-SAPI-INV-001': // Patente de Invención
            recaudosContent = `
Adjunto a la presente, consignamos los siguientes recaudos técnicos y administrativos:
- Formulario de solicitud (FP-01) debidamente cumplimentado.
- Memoria descriptiva detallada del invento.
- Pliego de reivindicaciones que define el alcance de la protección solicitada.
- Dibujos técnicos, si son necesarios para la comprensión del invento.
- Resumen de la invención.
- Comprobante de pago de la tasa de presentación.
`;
            break;
         case 'PERM-SAPI-DA-001': // Derecho de Autor
            recaudosContent = `
Adjunto a la presente, consignamos los siguientes recaudos para el registro de la obra:
- Un (1) ejemplar de la obra a registrar.
- Formulario de solicitud de registro debidamente llenado.
- Comprobante de pago de las tasas administrativas correspondientes.
`;
            break;
        default:
            recaudosContent = `
Adjuntamos todos los recaudos necesarios para procesar dicha solicitud.
`;
            break;
    }


    return baseContent + recaudosContent + `
Sin otro particular al que hacer referencia,

Atentamente,

_________________________
[Nombre del Representante Legal]
C.I: [C.I. del Representante]
`;
};

const getPlanillaResguardoTemporalContent = () => `
----------------------------------------------------------------------
        SOLICITUD DE RESGUARDO TEMPORAL DE LA INVENCIÓN (FP-01)
----------------------------------------------------------------------
Servicio Autónomo de la Propiedad Intelectual (SAPI)

FECHA DE SOLICITUD: ${new Date().toLocaleDateString('es-ES')}

1. DATOS DEL SOLICITANTE:
   Nombre/Razón Social: Kyron, C.A.
   RIF: J-12345678-9
   Domicilio: Av. Principal, Edif. Centro, Piso 1, Caracas, Venezuela
   Teléfono: +58 212-1234567
   Email: legal@kyron.com

2. DATOS DEL INVENTOR (si es distinto al solicitante):
   Nombre: _________________________
   C.I./Pasaporte: _________________________
   Domicilio: _________________________

3. TÍTULO DE LA INVENCIÓN:
   [Título claro y conciso de la invención, ej: "Sistema de Clasificación Automatizada de Residuos Sólidos mediante Visión por Computadora"]

4. DESCRIPCIÓN SUCINTA DE LA INVENCIÓN:
   [Breve descripción del propósito y funcionamiento de la invención. Este campo debe ser llenado por el solicitante.]
   ______________________________________________________________________
   ______________________________________________________________________
   ______________________________________________________________________

5. RECAUDOS CONSIGNADOS:
   [X] Formulario de solicitud.
   [X] Descripción detallada de la invención.
   [X] Comprobante de pago de la tasa administrativa.

DECLARACIÓN:
Declaro bajo juramento que la información aquí suministrada es cierta y que soy el inventor/representante legal con derecho sobre esta invención.

_________________________
Firma del Solicitante / Representante Legal
`;

export default function PermisosPage() {
  const [permisos, setPermisos] = useState(initialPermisos);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [payments, setPayments] = useState<Record<string, Payment[]>>({
      "PERM-MUN-001": [
          { id: 1, fecha: '2024-03-01', monto: 500, referencia: 'PAGO-TASA-001' }
      ]
  });
  const [selectedPermit, setSelectedPermit] = useState<Permiso | null>(null);
  const [isAlertConfigOpen, setIsAlertConfigOpen] = useState(false);
  const [alertEmail, setAlertEmail] = useState("maitehdez37@gmail.com");
  const [alertPhone, setAlertPhone] = useState("+584121234567");

  const { toast } = useToast();

  const handleRenew = (permisoId: string) => {
    setPermisos(permisos.map(p => {
        if (p.id === permisoId) {
            if (!p.fechaVencimiento || ["N/A", "Indefinido", "Vitalicio"].includes(p.fechaVencimiento)) {
                 toast({
                    title: "No requiere renovación",
                    description: `El permiso ${p.id} no tiene una fecha de vencimiento definida.`,
                });
                return p;
            }
            
            const currentVencimiento = new Date(p.fechaVencimiento);
            const newVencimiento = new Date(currentVencimiento.setFullYear(currentVencimiento.getFullYear() + 1));
            
            toast({
                title: "Renovación Guardada en la Nube",
                description: `Se ha notificado al representante legal sobre la renovación del permiso ${p.id}.`,
                action: <CheckCircle className="text-green-500" />,
            });
            
            return { ...p, estado: "En Renovación", fechaVencimiento: newVencimiento.toISOString().split('T')[0] };
        }
        return p;
    }));
  };

  const handleFileSelect = (file: File) => {
      setSelectedFile(file);
      toast({
          title: "Archivo Cargado y Guardado en la Nube",
          description: `"${file.name}" listo para enviar. El archivo se conservará por 10 años.`,
          action: <CheckCircle className="text-green-500" />,
      });
  };
  
  const handleAddPayment = (permisoId: string, event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      const newPayment: Payment = {
          id: Date.now(),
          fecha: formData.get('fecha') as string,
          monto: Number(formData.get('monto')),
          referencia: formData.get('referencia') as string,
      };

      setPayments(prev => ({
          ...prev,
          [permisoId]: [...(prev[permisoId] || []), newPayment]
      }));

      toast({
        title: "Pago Registrado",
        description: `Se ha añadido un nuevo pago al historial del permiso ${permisoId}.`
      });
      form.reset();
  };

  const handleSendNotification = (permiso: Permiso | null, isManual: boolean = false) => {
    let message = '';
    if (isManual) {
        message = `ALERTA DE CUMPLIMIENTO: Se ha detectado que existen permisos vencidos o por vencer. Por favor, revise el portal de gestión para tomar acción inmediata.`;
    } else if (permiso) {
        message = `ALERTA DE RENOVACIÓN: El permiso "${permiso.tipo}" (ID: ${permiso.id}) está próximo a vencer o ha vencido (${formatDate(permiso.fechaVencimiento)}). Se requiere acción inmediata.`;
    } else {
        return;
    }
    
    const whatsappUrl = `https://wa.me/${alertPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
        
    toast({
        title: `Notificación de Alerta Enviada por WhatsApp`,
        description: `Se ha enviado un mensaje al ${alertPhone}.`,
    });
    
    if(selectedPermit) setSelectedPermit(null);
  };
  
  const handleDownloadLetter = (permiso: Permiso | null, tipo: 'solicitud' | 'renovacion' | 'planilla_resguardo') => {
    if (!permiso) return;
    let content = '';
    let filename = '';

    if (tipo === 'solicitud') {
        content = getLetterContent(permiso);
        filename = `Solicitud_${permiso.tipo.replace(/ /g, '_')}.docx`;
    } else if (tipo === 'renovacion') {
        content = `
Ciudad, ${new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}

Señores
${permiso.emisor}
Presente.-

Asunto: Solicitud de Renovación de Permiso - ${permiso.tipo}

Yo, [Nombre del Representante Legal], en mi carácter de Representante Legal de la empresa [Nombre de la Empresa], C.A., RIF [RIF de la Empresa], me dirijo a ustedes para solicitar formalmente la renovación del permiso de "${permiso.tipo}", con referencia N° ${permiso.id}, próximo a vencer.

Adjuntamos los recaudos correspondientes para la renovación.

Atentamente,

_________________________
[Nombre del Representante Legal]
C.I: [C.I. del Representante]
`;
        filename = `Renovacion_${permiso.tipo.replace(/ /g, '_')}.docx`;
    } else if (tipo === 'planilla_resguardo') {
        content = getPlanillaResguardoTemporalContent();
        filename = `Planilla_Resguardo_Temporal.docx`;
    }
    
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
        "xmlns:w='urn:schemas-microsoft-com:office:word' "+
        "xmlns='http://www.w3.org/TR/REC-html40'>"+
        "<head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + `<div style="font-family: Arial, sans-serif;">${content.replace(/\n/g, '<br/>')}</div>` + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = filename;
    fileDownload.click();
    document.body.removeChild(fileDownload);

    toast({
        title: 'Descarga Iniciada',
        description: `El documento se está descargando como ${filename}.`
    });
};


  const groupedPermisos = permisos.reduce((acc, permiso) => {
    const emisor = permiso.emisor;
    if (!acc[emisor]) {
      acc[emisor] = [];
    }
    acc[emisor].push(permiso);
    return acc;
  }, {} as Record<string, typeof initialPermisos>);
  
  const permisosPorVencer = permisos.filter(p => p.estado === 'Por Vencer' || p.estado === 'Vencido');

  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <UserCheck className="h-8 w-8" />
                Gestión de Permisos
            </h1>
            <p className="text-muted-foreground mt-2">
                Consulta y gestiona todos los permisos y licencias de tu empresa.
            </p>
        </div>
        <div className="flex items-center gap-2">
             <Dialog open={isAlertConfigOpen} onOpenChange={setIsAlertConfigOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Configurar Alertas</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Sistema de Notificación Automatizada</DialogTitle>
                        <DialogDescription>
                            Configura el sistema para recibir alertas automáticas sobre vencimientos de permisos.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="alert-email">Correo para Notificaciones</Label>
                            <Input id="alert-email" type="email" value={alertEmail} onChange={(e) => setAlertEmail(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="alert-phone">Nro. WhatsApp para Alertas (+CódigoPaís)</Label>
                            <Input id="alert-phone" type="tel" value={alertPhone} onChange={(e) => setAlertPhone(e.target.value)} placeholder="+584121234567" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="alert-frequency">Frecuencia de Avisos</Label>
                            <Select defaultValue="weekly">
                                <SelectTrigger id="alert-frequency">
                                    <SelectValue placeholder="Seleccionar frecuencia..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="daily">Diaria</SelectItem>
                                    <SelectItem value="weekly">Semanal</SelectItem>
                                    <SelectItem value="monthly">Mensual</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => {toast({title: "Configuración Guardada", description: `Las alertas se enviarán a ${alertEmail} y ${alertPhone}.`}); setIsAlertConfigOpen(false);}}>
                            Guardar Configuración
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Button>
                <PlusCircle className="mr-2" />
                Solicitar Nuevo Permiso
            </Button>
        </div>
      </header>

       {permisosPorVencer.length > 0 && (
          <Alert variant="destructive" className="mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Alerta de Vencimiento</AlertTitle>
            <AlertDescription className="flex justify-between items-center">
              <span>Tienes {permisosPorVencer.length} permiso(s) vencido(s) o por vencer. Revisa la tabla para más detalles.</span>
              <Button size="sm" variant="destructive" onClick={() => handleSendNotification(null, true)}>
                <MessageSquare className="mr-2 h-4 w-4"/>
                Notificar a Administración por WhatsApp
              </Button>
            </AlertDescription>
          </Alert>
        )}

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Permisos y Licencias por Ente Emisor</CardTitle>
            <CardDescription>Listado de todos los permisos activos, agrupados por la entidad que los regula.</CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {Object.entries(groupedPermisos).sort(([a], [b]) => a.localeCompare(b)).map(([emisor, listaPermisos]) => (
                <AccordionItem value={emisor} key={emisor}>
                  <AccordionTrigger>
                    <div className="flex justify-between w-full pr-4">
                      <span className="font-semibold text-lg">{emisor}</span>
                      <Badge variant="secondary">{listaPermisos.length} Permiso(s)</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                     {emisor === 'SAPI' && (
                        <div className="border-l-4 border-blue-500 pl-4 py-4 my-4 bg-blue-500/5">
                           <h3 className="font-semibold mb-2">Guías y Recursos del SAPI</h3>
                           <Accordion type="single" collapsible className="w-full">
                               <AccordionItem value="paso-a-paso-marca">
                                   <AccordionTrigger>Paso a Paso para Solicitar el Registro de una Marca</AccordionTrigger>
                                   <AccordionContent className="text-muted-foreground">
                                       <ol className="list-decimal list-inside space-y-2 text-sm">
                                           <li>Búsqueda de Antecedentes: Verificar en la base de datos del SAPI que la marca no esté ya registrada.</li>
                                           <li>Clasificación de NIZA: Determinar la clase (o clases) a la que pertenecen los productos o servicios.</li>
                                           <li>Pago de Tasas: Realizar el pago de la tasa inicial de solicitud.</li>
                                           <li>Llenado de Planilla: Completar la planilla de solicitud con todos los datos del solicitante y la marca.</li>
                                           <li>Consignación de Recaudos: Presentar la solicitud junto con el logo (si aplica), timbres fiscales y comprobante de pago.</li>
                                           <li>Publicación en Boletín: Una vez admitida, la solicitud se publica en el Boletín de la Propiedad Industrial.</li>
                                           <li>Periodo de Oposición: Se abre un lapso para que terceros puedan oponerse al registro.</li>
                                           <li>Examen de Fondo y Concesión: Si no hay oposiciones, el SAPI realiza un examen final y, si procede, concede el registro.</li>
                                       </ol>
                                   </AccordionContent>
                               </AccordionItem>
                               <AccordionItem value="clasificador-niza">
                                   <AccordionTrigger>Clasificador Internacional NIZA</AccordionTrigger>
                                   <AccordionContent className="text-muted-foreground">
                                       <p className="text-sm">El Clasificador de Niza es un sistema internacional para clasificar productos y servicios para el registro de marcas. Consta de 45 clases (34 para productos y 11 para servicios). Es crucial seleccionar la clase correcta para asegurar la protección adecuada de tu marca. Nuestro sistema puede autocompletar la planilla basándose en la descripción de tu negocio.</p>
                                   </AccordionContent>
                               </AccordionItem>
                               <AccordionItem value="tarifas-cuentas">
                                   <AccordionTrigger>Tarifas y Cuentas Bancarias</AccordionTrigger>
                                   <AccordionContent className="text-muted-foreground">
                                       <p className="text-sm">Las tarifas del SAPI varían según el trámite y se actualizan periódicamente. Deben ser pagadas en Petro (PTR) o su equivalente en Bolívares. Los pagos se realizan en las cuentas bancarias designadas por el SAPI.</p>
                                   </AccordionContent>
                               </AccordionItem>
                           </Accordion>
                        </div>
                     )}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Referencia</TableHead>
                                <TableHead>Tipo de Permiso</TableHead>
                                <TableHead>Vencimiento</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {listaPermisos.map((permiso) => (
                                <TableRow key={permiso.id} className={permiso.estado === 'Vencido' ? 'bg-destructive/10' : permiso.estado === 'Por Vencer' ? 'bg-secondary/50' : ''}>
                                    <TableCell className="font-medium">{permiso.id}</TableCell>
                                    <TableCell>{permiso.tipo}</TableCell>
                                    <TableCell>{formatDate(permiso.fechaVencimiento)}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant[permiso.estado]}>{permiso.estado}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right space-x-1">
                                        {permiso.id === 'REG-MERC-001' ? (
                                             <Button variant="outline" size="sm" onClick={() => toast({title: "Descarga Iniciada", description: "El Registro Mercantil se está descargando."})}>
                                                <Download className="mr-2 h-4 w-4" />
                                                Descargar Documento
                                            </Button>
                                        ) : (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" size="icon" title="Ver Detalles" onClick={() => setSelectedPermit(permiso)}>
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-4xl">
                                                <DialogHeader>
                                                    <DialogTitle>Detalles del Permiso: {permiso.id}</DialogTitle>
                                                    <DialogDescription>{permiso.tipo}</DialogDescription>
                                                </DialogHeader>
                                                <Tabs defaultValue="requisitos" className="py-4">
                                                    <TabsList className="grid w-full grid-cols-4">
                                                        <TabsTrigger value="requisitos">Requisitos</TabsTrigger>
                                                        <TabsTrigger value="cartas">Modelos de Carta</TabsTrigger>
                                                        <TabsTrigger value="documentos">Cargar Documentos</TabsTrigger>
                                                        <TabsTrigger value="pagos">Historial de Pagos</TabsTrigger>
                                                    </TabsList>
                                                    <TabsContent value="requisitos" className="mt-4">
                                                        <div className="grid grid-cols-2 gap-6">
                                                            <div>
                                                                <h4 className="font-semibold mb-2">Requisitos de Inscripción</h4>
                                                                {permiso.requisitosInscripcion.length > 0 ? (
                                                                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                                                        {permiso.requisitosInscripcion.map(req => <li key={req}>{req}</li>)}
                                                                    </ul>
                                                                ) : <p className="text-sm text-muted-foreground">No hay requisitos específicos listados.</p>}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold mb-2">Requisitos de Renovación</h4>
                                                                {permiso.requisitosRenovacion.length > 0 ? (
                                                                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                                                        {permiso.requisitosRenovacion.map(req => <li key={req}>{req}</li>)}
                                                                    </ul>
                                                                ) : <p className="text-sm text-muted-foreground">No hay requisitos de renovación listados.</p>}
                                                            </div>
                                                        </div>
                                                    </TabsContent>
                                                    <TabsContent value="cartas" className="mt-4">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {permiso.id === 'PERM-SAPI-002' ? (
                                                                 <div className="p-4 border rounded-lg md:col-span-2">
                                                                    <h4 className="font-semibold mb-2">Planilla de Solicitud de Resguardo Temporal (Pre-llenada)</h4>
                                                                    <div className="text-xs text-muted-foreground bg-secondary p-3 rounded-md font-mono h-64 overflow-auto whitespace-pre-wrap">
                                                                        {getPlanillaResguardoTemporalContent()}
                                                                    </div>
                                                                    <div className="flex gap-2 mt-2">
                                                                        <Button size="sm" variant="outline" onClick={() => {navigator.clipboard.writeText(getPlanillaResguardoTemporalContent()); toast({title: "Copiado"})}}>Copiar</Button>
                                                                        <Button size="sm" variant="outline" onClick={() => handleDownloadLetter(selectedPermit, 'planilla_resguardo')}>Descargar (.docx)</Button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <div className="p-4 border rounded-lg">
                                                                        <h4 className="font-semibold mb-2">Modelo de Carta de Solicitud</h4>
                                                                        <div className="text-xs text-muted-foreground bg-secondary p-3 rounded-md font-mono h-48 overflow-auto whitespace-pre-wrap">
                                                                            {getLetterContent(selectedPermit)}
                                                                        </div>
                                                                        <div className="flex gap-2 mt-2">
                                                                            <Button size="sm" variant="outline" onClick={() => {navigator.clipboard.writeText(getLetterContent(selectedPermit)); toast({title: "Copiado"})}}>Copiar</Button>
                                                                            <Button size="sm" variant="outline" onClick={() => handleDownloadLetter(selectedPermit, 'solicitud')}>Descargar (.docx)</Button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="p-4 border rounded-lg">
                                                                        <h4 className="font-semibold mb-2">Modelo de Carta de Renovación</h4>
                                                                        <Button size="sm" variant="outline" onClick={() => handleDownloadLetter(selectedPermit, 'renovacion')}>Descargar (.docx)</Button>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </TabsContent>
                                                    <TabsContent value="documentos" className="mt-4">
                                                        <div className="space-y-4">
                                                            <div className="space-y-2">
                                                                <Label>Adjuntar Inscripción / Renovación / Pago</Label>
                                                                <FileInputTrigger onFileSelect={handleFileSelect}>
                                                                    <Button variant="outline" className="w-full">
                                                                        <FileUp className="mr-2 h-4 w-4" />
                                                                        Cargar Documento (PDF, JPG, PNG)
                                                                    </Button>
                                                                </FileInputTrigger>
                                                                {selectedFile && 
                                                                    <div className="flex items-center justify-center text-sm text-green-500 font-medium pt-2">
                                                                        <CheckCircle className="h-4 w-4 mr-2"/>
                                                                        <p>Archivo cargado: {selectedFile.name}</p>
                                                                    </div>
                                                                }
                                                            </div>
                                                            <CardFooter className="p-0 pt-2">
                                                               <p className="text-xs text-muted-foreground flex items-center gap-2"><Info className="h-4 w-4 shrink-0"/>Los documentos se archivarán de forma segura por 10 años.</p>
                                                            </CardFooter>
                                                        </div>
                                                    </TabsContent>
                                                    <TabsContent value="pagos" className="mt-4">
                                                        <div className="space-y-4">
                                                            <h4 className="font-semibold">Pagos Registrados</h4>
                                                            <div className="border rounded-md max-h-48 overflow-y-auto">
                                                                <Table>
                                                                    <TableHeader>
                                                                        <TableRow>
                                                                            <TableHead>Fecha</TableHead>
                                                                            <TableHead>Referencia</TableHead>
                                                                            <TableHead className="text-right">Monto</TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        {payments[permiso.id]?.length > 0 ? payments[permiso.id].map(p => (
                                                                            <TableRow key={p.id}>
                                                                                <TableCell>{formatDate(p.fecha)}</TableCell>
                                                                                <TableCell>{p.referencia}</TableCell>
                                                                                <TableCell className="text-right">{formatCurrency(p.monto, "Bs.")}</TableCell>
                                                                            </TableRow>
                                                                        )) : (
                                                                            <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">No hay pagos registrados.</TableCell></TableRow>
                                                                        )}
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                            <form onSubmit={(e) => handleAddPayment(permiso.id, e)}>
                                                                <div className="grid sm:grid-cols-3 gap-2 border-t pt-4 mt-4">
                                                                    <Input name="fecha" type="date" required/>
                                                                    <Input name="referencia" placeholder="Referencia" required/>
                                                                    <Input name="monto" type="number" placeholder="Monto (Bs.)" required/>
                                                                    <Button type="submit" className="sm:col-span-3">Registrar Pago</Button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </TabsContent>
                                                </Tabs>
                                                <DialogFooter className="gap-2 sm:gap-0 sm:justify-between pt-4 border-t">
                                                    <Button variant="secondary">
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Descargar Permiso
                                                    </Button>
                                                    {(permiso.estado === "Por Vencer" || permiso.estado === "Vencido") && (
                                                        <Button onClick={() => handleRenew(permiso.id)}>
                                                            <RefreshCw className="mr-2 h-4 w-4" />
                                                            Iniciar Renovación
                                                        </Button>
                                                    )}
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                         )}
                                         {(permiso.estado === "Por Vencer" || permiso.estado === "Vencido") && (
                                            <Button variant="outline" size="sm" className="text-orange-500 border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-600" onClick={() => handleSendNotification(permiso)}>
                                                <MessageSquare className="mr-2 h-4 w-4"/>
                                                Notificar por WhatsApp
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

