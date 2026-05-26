import { Leaf, Globe, Smartphone, User, Building2, Scale, Users, Headphones, type LucideIcon } from 'lucide-react';

export interface ModuleRegistrationConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  bgGradient: string;
  shadowColor: string;
  dashboardPath: string;
  welcomeTitle: string;
  welcomeDescription: string;
  welcomeEmailSubject: string;
  welcomeEmailBody: string;
}

export const MODULE_REGISTRATION: Record<string, ModuleRegistrationConfig> = {
  personal: {
    id: 'personal',
    label: 'Cuenta Personal',
    icon: User,
    color: 'from-primary via-blue-500 to-emerald-500',
    bgGradient: 'from-emerald-500/5 via-transparent to-blue-500/5',
    shadowColor: 'shadow-primary/20',
    dashboardPath: '/dashboard',
    welcomeTitle: 'Cuenta Personal',
    welcomeDescription: 'Tu cuenta personal está lista. Accede a documentos, servicios y más desde un solo lugar.',
    welcomeEmailSubject: 'Tu cuenta personal en System Kyron está lista',
    welcomeEmailBody: `
      <p style="margin: 0 0 16px 0;">Tu cuenta personal ha sido creada exitosamente. Ahora puedes acceder a tu perfil, gestionar documentos y usar los módulos que hayas contratado.</p>
      <p style="margin: 0 0 8px 0;"><strong style="color: #0EA5E9;">Tus primeros pasos:</strong></p>
      <ul style="margin: 0 0 16px 0; padding-left: 20px;">
        <li style="margin-bottom: 6px;">Completa tu perfil con tus datos fiscales</li>
        <li style="margin-bottom: 6px;">Explora los módulos disponibles para ti</li>
        <li style="margin-bottom: 6px;">Revisa la guía de usuario si tienes dudas</li>
      </ul>
      <p style="margin: 0;">Tu información está protegida con cifrado AES-256 desde el primer momento.</p>
    `,
  },
  telecom: {
    id: 'telecom',
    label: 'Mi Línea 5G',
    icon: Smartphone,
    color: 'from-blue-500 via-sky-500 to-cyan-400',
    bgGradient: 'from-blue-500/5 via-transparent to-cyan-500/5',
    shadowColor: 'shadow-blue-500/20',
    dashboardPath: '/mi-linea',
    welcomeTitle: 'Línea Activa',
    welcomeDescription: 'Tu línea 5G ya está asociada a tu cuenta. Gestiona saldo, consumo y facturación desde tu portal.',
    welcomeEmailSubject: 'Tu línea 5G en System Kyron está activa',
    welcomeEmailBody: `
      <p style="margin: 0 0 16px 0;">Tu línea 5G ha sido activada y asociada a tu cuenta. Ahora puedes gestionar tu saldo, ver tu consumo y pagar facturas desde un solo lugar.</p>
      <p style="margin: 0 0 8px 0;"><strong style="color: #0EA5E9;">Lo que puedes hacer:</strong></p>
      <ul style="margin: 0 0 16px 0; padding-left: 20px;">
        <li style="margin-bottom: 6px;">Consultar tu saldo y consumo de datos</li>
        <li style="margin-bottom: 6px;">Pagar facturas y recargar en línea</li>
        <li style="margin-bottom: 6px;">Administrar tus líneas adicionales</li>
      </ul>
      <p style="margin: 0;">Tu línea queda operativa de inmediato.</p>
    `,
  },
  sostenibilidad: {
    id: 'sostenibilidad',
    label: 'Sostenibilidad',
    icon: Leaf,
    color: 'from-emerald-500 to-green-600',
    bgGradient: 'from-emerald-500/5 via-transparent to-green-500/5',
    shadowColor: 'shadow-emerald-500/20',
    dashboardPath: '/sostenibilidad',
    welcomeTitle: 'Eco-Perfil Listo',
    welcomeDescription: 'Tu perfil de sostenibilidad está activo. Mide y compensa tu huella ecológica desde tu panel.',
    welcomeEmailSubject: 'Tu perfil de Sostenibilidad en System Kyron está listo',
    welcomeEmailBody: `
      <p style="margin: 0 0 16px 0;">Tu perfil de sostenibilidad ha sido creado. Ahora puedes medir tu huella ecológica, gestionar reciclaje y acumular eco-créditos.</p>
      <p style="margin: 0 0 8px 0;"><strong style="color: #10B981;">Tus primeras acciones:</strong></p>
      <ul style="margin: 0 0 16px 0; padding-left: 20px;">
        <li style="margin-bottom: 6px;">Registra tu primera medición de huella de carbono</li>
        <li style="margin-bottom: 6px;">Configura tus metas de reciclaje</li>
        <li style="margin-bottom: 6px;">Revisa los eco-créditos disponibles</li>
      </ul>
      <p style="margin: 0;">Cada acción sostenible cuenta. Bienvenido al cambio.</p>
    `,
  },
  juridico: {
    id: 'juridico',
    label: 'Gestión Empresarial',
    icon: Building2,
    color: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-500/5 via-transparent to-orange-500/5',
    shadowColor: 'shadow-amber-500/20',
    dashboardPath: '/dashboard-empresas',
    welcomeTitle: 'Portal Corporativo',
    welcomeDescription: 'Tu empresa ya está registrada. Gestiona facturación, nómina, contabilidad y más desde tu escritorio empresarial.',
    welcomeEmailSubject: 'Tu empresa en System Kyron está registrada',
    welcomeEmailBody: `
      <p style="margin: 0 0 16px 0;">Tu empresa ha sido registrada exitosamente. Ahora tienes acceso al ecosistema de gestión empresarial más completo de Venezuela.</p>
      <p style="margin: 0 0 8px 0;"><strong style="color: #F59E0B;">Lo que puedes hacer ahora:</strong></p>
      <ul style="margin: 0 0 16px 0; padding-left: 20px;">
        <li style="margin-bottom: 6px;">Configurar los datos fiscales de tu empresa</li>
        <li style="margin-bottom: 6px;">Emitir facturas con IVA y tasa BCV automática</li>
        <li style="margin-bottom: 6px;">Gestionar nómina, empleados y proveedores</li>
        <li style="margin-bottom: 6px;">Llevar tu contabilidad al día</li>
      </ul>
      <p style="margin: 0;">Tus datos están protegidos con cifrado AES-256 y auditoría inmutable.</p>
    `,
  },
  legal: {
    id: 'legal',
    label: 'Asesoría Legal',
    icon: Scale,
    color: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-500/5 via-transparent to-orange-500/5',
    shadowColor: 'shadow-amber-500/20',
    dashboardPath: '/escritorio-juridico',
    welcomeTitle: 'Despacho Legal',
    welcomeDescription: 'Tu escritorio jurídico está listo. Gestiona documentos, contratos y poderes desde tu portal legal.',
    welcomeEmailSubject: 'Tu escritorio jurídico en System Kyron está listo',
    welcomeEmailBody: `
      <p style="margin: 0 0 16px 0;">Tu escritorio jurídico ha sido activado. Ahora puedes gestionar documentos legales, contratos y poderes desde un solo lugar.</p>
      <p style="margin: 0 0 8px 0;"><strong style="color: #F59E0B;">Tus primeras acciones:</strong></p>
      <ul style="margin: 0 0 16px 0; padding-left: 20px;">
        <li style="margin-bottom: 6px;">Sube tus primeros documentos legales</li>
        <li style="margin-bottom: 6px;">Revisa las alertas regulatorias vigentes</li>
        <li style="margin-bottom: 6px;">Configura tus plantillas de contratos</li>
      </ul>
      <p style="margin: 0;">Tu información legal está protegida con cifrado de extremo a extremo.</p>
    `,
  },
  rrhh: {
    id: 'rrhh',
    label: 'Asesoría Contable',
    icon: Building2,
    color: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-500/5 via-transparent to-teal-500/5',
    shadowColor: 'shadow-emerald-500/20',
    dashboardPath: '/dashboard-empresas',
    welcomeTitle: 'Suite Contable',
    welcomeDescription: 'Tu suite de asesoría contable está lista. Gestiona contabilidad, facturación, nómina y talento desde un solo lugar.',
    welcomeEmailSubject: 'Tu suite de Asesoría Contable en System Kyron está lista',
    welcomeEmailBody: `
      <p style="margin: 0 0 16px 0;">Tu suite de asesoría contable ha sido activada. Ahora puedes gestionar la contabilidad, facturación, nómina y equipo de tu empresa.</p>
      <p style="margin: 0 0 8px 0;"><strong style="color: #10B981;">Tus primeras acciones:</strong></p>
      <ul style="margin: 0 0 16px 0; padding-left: 20px;">
        <li style="margin-bottom: 6px;">Configura los datos fiscales de tu empresa</li>
        <li style="margin-bottom: 6px;">Registra a tus empleados en el sistema</li>
        <li style="margin-bottom: 6px;">Configura los parámetros de nómina</li>
        <li style="margin-bottom: 6px;">Revisa las obligaciones laborales del mes</li>
      </ul>
      <p style="margin: 0;">Tus datos están protegidos con cifrado AES-256.</p>
    `,
  },
};

export function getModuleConfig(moduleId: string): ModuleRegistrationConfig {
  return MODULE_REGISTRATION[moduleId] || MODULE_REGISTRATION.personal;
}

export const MODULE_REDIRECT_MAP: Record<string, string> = {};
for (const [key, config] of Object.entries(MODULE_REGISTRATION)) {
  MODULE_REDIRECT_MAP[key] = config.dashboardPath;
}
