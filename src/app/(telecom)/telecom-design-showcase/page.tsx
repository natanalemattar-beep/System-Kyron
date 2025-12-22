
"use client";

import { useEffect } from "react";

export default function TelecomDesignShowcasePage() {

    useEffect(() => {
        // This is a client component, so we can safely manipulate the DOM or run scripts
        // if needed, although the provided script tag will handle its own execution.
    }, []);

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Plataforma Telecom - Dashboard</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
            <style>
                :root {
                    --color-bg: #FFFFFF;
                    --color-bg-secondary: #F8FAFC;
                    --color-text: #1A202C;
                    --color-text-secondary: #718096;
                    --color-border: #E2E8F0;
                    --color-primary: #2D3748;
                    --color-accent: #B76E22;
                    --color-success: #38A169;
                    --color-warning: #D69E2E;
                    --color-error: #E53E3E;
                    --font-primary: 'Inter', -apple-system, sans-serif;
                    --font-mono: 'SF Mono', 'Roboto Mono', monospace;
                    --spacing-xs: 8px;
                    --spacing-sm: 16px;
                    --spacing-md: 24px;
                    --spacing-lg: 32px;
                    --spacing-xl: 48px;
                    --spacing-xxl: 64px;
                }
                
                .telecom-design-body {
                    font-family: var(--font-primary);
                    color: var(--color-text);
                    background: var(--color-bg);
                    line-height: 1.6;
                }
                
                .telecom-design-body * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .telecom-design-body .header {
                    height: 64px;
                    border-bottom: 1px solid var(--color-border);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 var(--spacing-lg);
                    position: sticky;
                    top: 0;
                    background: var(--color-bg);
                    z-index: 100;
                }
                
                .telecom-design-body .logo {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: var(--color-text);
                    text-decoration: none;
                }
                
                .telecom-design-body .nav {
                    display: flex;
                    gap: var(--spacing-xl);
                }
                
                .telecom-design-body .nav-link {
                    color: var(--color-text-secondary);
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.2s;
                }
                
                .telecom-design-body .nav-link:hover {
                    color: var(--color-text);
                }
                
                .telecom-design-body .user-info {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                }
                
                .telecom-design-body .hero {
                    padding: var(--spacing-xxl) var(--spacing-lg);
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                .telecom-design-body .hero-title {
                    font-size: 2.441rem;
                    font-weight: 700;
                    line-height: 1.2;
                    margin-bottom: var(--spacing-md);
                }
                
                .telecom-design-body .hero-description {
                    font-size: 1.25rem;
                    color: var(--color-text-secondary);
                    margin-bottom: var(--spacing-xl);
                    max-width: 600px;
                }
                
                .telecom-design-body .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 var(--spacing-lg);
                }
                
                .telecom-design-body .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: var(--spacing-xl);
                    margin-bottom: var(--spacing-xxl);
                }
                
                .telecom-design-body .card {
                    background: var(--color-bg);
                    border: 1px solid var(--color-border);
                    border-radius: 8px;
                    padding: var(--spacing-xl);
                }
                
                .telecom-design-body .card-header {
                    margin-bottom: var(--spacing-lg);
                }
                
                .telecom-design-body .card-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: var(--spacing-xs);
                }
                
                .telecom-design-body .card-description {
                    color: var(--color-text-secondary);
                    font-size: 0.875rem;
                }
                
                .telecom-design-body .card-content {
                    margin-bottom: var(--spacing-lg);
                }
                
                .telecom-design-body .data-list {
                    list-style: none;
                }
                
                .telecom-design-body .data-item {
                    display: flex;
                    justify-content: space-between;
                    padding: var(--spacing-sm) 0;
                    border-bottom: 1px solid var(--color-border);
                }
                
                .telecom-design-body .data-item:last-child {
                    border-bottom: none;
                }
                
                .telecom-design-body .data-label {
                    color: var(--color-text-secondary);
                }
                
                .telecom-design-body .data-value {
                    font-weight: 500;
                }
                
                .telecom-design-body .data-value.critical {
                    color: var(--color-error);
                }
                
                .telecom-design-body .data-value.active {
                    color: var(--color-success);
                }
                
                .telecom-design-body .btn {
                    display: inline-block;
                    padding: var(--spacing-sm) var(--spacing-lg);
                    border-radius: 6px;
                    font-weight: 500;
                    text-decoration: none;
                    transition: all 0.2s;
                    cursor: pointer;
                    border: none;
                    font-family: var(--font-primary);
                    font-size: 1rem;
                }
                
                .telecom-design-body .btn-primary {
                    background: var(--color-primary);
                    color: white;
                }
                
                .telecom-design-body .btn-primary:hover {
                    opacity: 0.9;
                }
                
                .telecom-design-body .btn-secondary {
                    background: transparent;
                    color: var(--color-primary);
                    border: 1px solid var(--color-border);
                }
                
                .telecom-design-body .btn-secondary:hover {
                    border-color: var(--color-primary);
                }
                
                .telecom-design-body .table-container {
                    overflow-x: auto;
                }
                
                .telecom-design-body .table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .telecom-design-body .table th {
                    text-align: left;
                    padding: var(--spacing-md) var(--spacing-sm);
                    border-bottom: 2px solid var(--color-border);
                    color: var(--color-text-secondary);
                    font-weight: 600;
                    background: var(--color-bg-secondary);
                }
                
                .telecom-design-body .table td {
                    padding: var(--spacing-md) var(--spacing-sm);
                    border-bottom: 1px solid var(--color-border);
                }
                
                .telecom-design-body .table tr:hover {
                    background: var(--color-bg-secondary);
                }
                
                .telecom-design-body .badge {
                    display: inline-block;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                
                .telecom-design-body .badge-active {
                    background: rgba(56, 161, 105, 0.1);
                    color: var(--color-success);
                }
                
                .telecom-design-body .badge-critical {
                    background: rgba(229, 62, 62, 0.1);
                    color: var(--color-error);
                }
                
                .telecom-design-body .alert {
                    padding: var(--spacing-md);
                    border-radius: 6px;
                    margin-bottom: var(--spacing-lg);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .telecom-design-body .alert-critical {
                    background: rgba(229, 62, 62, 0.05);
                    border: 1px solid rgba(229, 62, 62, 0.2);
                }
                
                .telecom-design-body .alert-content {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-sm);
                }
                
                .telecom-design-body .footer {
                    border-top: 1px solid var(--color-border);
                    padding: var(--spacing-xl) var(--spacing-lg);
                    text-align: center;
                    color: var(--color-text-secondary);
                    font-size: 0.875rem;
                }
                
                @media (max-width: 768px) {
                    .telecom-design-body .header {
                        padding: 0 var(--spacing-md);
                    }
                    
                    .telecom-design-body .nav {
                        display: none;
                    }
                    
                    .telecom-design-body .hero {
                        padding: var(--spacing-xl) var(--spacing-md);
                    }
                    
                    .telecom-design-body .hero-title {
                        font-size: 1.953rem;
                    }
                    
                    .telecom-design-body .grid {
                        grid-template-columns: 1fr;
                        gap: var(--spacing-lg);
                    }
                    
                    .telecom-design-body .container {
                        padding: 0 var(--spacing-md);
                    }
                }
            </style>
        </head>
        <body class="telecom-design-body">
            <header class="header">
                <a href="/" class="logo">TELECOM</a>
                <nav class="nav">
                    <a href="#" class="nav-link">Dashboard</a>
                    <a href="#" class="nav-link">Licencias</a>
                    <a href="#" class="nav-link">Clientes</a>
                    <a href="#" class="nav-link">Operaciones</a>
                    <a href="#" class="nav-link">Facturación</a>
                </nav>
                <div class="user-info">
                    <span>Operador NOC · 14:30</span>
                    <div class="avatar"></div>
                </div>
            </header>
            <main>
                <section class="hero">
                    <h1 class="hero-title">Gestión de Telecomunicaciones</h1>
                    <p class="hero-description">Una visión clara y minimalista de tus operaciones, clientes y cumplimiento regulatorio.</p>
                    <div class="hero-actions">
                        <a href="#estado" class="btn btn-primary">Ver estado completo</a>
                        <a href="/soporte" class="btn btn-secondary">Contactar soporte</a>
                    </div>
                </section>
                <section class="container">
                    <div class="alert alert-critical">
                        <div class="alert-content">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="#E53E3E"/>
                            </svg>
                            <span><strong>Atención:</strong> La Habilitación Postal (CON-003) está vencida desde el 01/06/2024. Existe riesgo de multas.</span>
                        </div>
                        <a href="/conatel/licenses" class="btn btn-primary">Renovar urgente</a>
                    </div>
                </section>
                <section class="container">
                    <h2 id="estado" style="margin-bottom: var(--spacing-xl); font-size: 1.953rem;">Estado actual</h2>
                    <div class="grid">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Cumplimiento CONATEL</h3>
                                <p class="card-description">Estado de licencias y permisos regulatorios</p>
                            </div>
                            <div class="card-content">
                                <ul class="data-list">
                                    <li class="data-item">
                                        <span class="data-label">Concesión Espectro</span>
                                        <span class="data-value active">Activo</span>
                                    </li>
                                    <li class="data-item">
                                        <span class="data-label">Licencia ISP</span>
                                        <span class="data-value active">Activo</span>
                                    </li>
                                    <li class="data-item">
                                        <span class="data-label">Habilitación Postal</span>
                                        <span class="data-value critical">Crítico</span>
                                    </li>
                                </ul>
                            </div>
                            <a href="/conatel/licenses" class="btn btn-secondary">Gestionar licencias</a>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Clientes activos</h3>
                                <p class="card-description">Resumen de base de clientes</p>
                            </div>
                            <div class="card-content">
                                <div style="font-size: 2.441rem; font-weight: 700; margin-bottom: var(--spacing-xs);">1,245</div>
                                <p style="color: var(--color-text-secondary); margin-bottom: var(--spacing-md);">clientes activos</p>
                                <ul class="data-list">
                                    <li class="data-item">
                                        <span class="data-label">Nuevos este mes</span>
                                        <span class="data-value">12</span>
                                    </li>
                                    <li class="data-item">
                                        <span class="data-label">SLA cumplido</span>
                                        <span class="data-value">98.7%</span>
                                    </li>
                                </ul>
                            </div>
                            <a href="/clientes" class="btn btn-secondary">Ver todos los clientes</a>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Facturación mensual</h3>
                                <p class="card-description">Estado de ingresos y cobranza</p>
                            </div>
                            <div class="card-content">
                                <div style="font-size: 2.441rem; font-weight: 700; margin-bottom: var(--spacing-xs);">$45,200</div>
                                <p style="color: var(--color-text-secondary); margin-bottom: var(--spacing-md);">facturación esperada</p>
                                <ul class="data-list">
                                    <li class="data-item">
                                        <span class="data-label">Cobrado</span>
                                        <span class="data-value">$42,150</span>
                                    </li>
                                    <li class="data-item">
                                        <span class="data-label">Pendiente</span>
                                        <span class="data-value">$3,050</span>
                                    </li>
                                </ul>
                            </div>
                            <a href="/facturacion" class="btn btn-secondary">Ver detalle de facturación</a>
                        </div>
                    </div>
                </section>
                <section class="container" style="margin-bottom: var(--spacing-xxl);">
                    <h2 style="margin-bottom: var(--spacing-xl); font-size: 1.953rem;">Licencias CONATEL</h2>
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Licencia / Permiso</th>
                                    <th>Estado</th>
                                    <th>Vencimiento</th>
                                    <th>Días</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Concesión de Espectro Radioeléctrico (CON-001)</td>
                                    <td><span class="badge badge-active">Activo</span></td>
                                    <td>20/03/2028</td>
                                    <td>-</td>
                                    <td><a href="#" class="btn btn-secondary" style="padding: 8px 16px;">Gestionar</a></td>
                                </tr>
                                <tr>
                                    <td>Licencia de Proveedor de Servicios (ISP) (CON-002)</td>
                                    <td><span class="badge badge-active">Activo</span></td>
                                    <td>01/04/2028</td>
                                    <td>-</td>
                                    <td><a href="#" class="btn btn-secondary" style="padding: 8px 16px;">Gestionar</a></td>
                                </tr>
                                <tr>
                                    <td>Habilitación Postal (CON-003)</td>
                                    <td><span class="badge badge-critical">Crítico</span></td>
                                    <td>01/06/2024</td>
                                    <td>68</td>
                                    <td><a href="#" class="btn btn-primary" style="padding: 8px 16px;">Renovar urgente</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
            <footer class="footer">
                <p>TELECOM · Plataforma de gestión de telecomunicaciones</p>
                <p style="margin-top: var(--spacing-sm);">© 2024 · Todos los derechos reservados</p>
            </footer>
        </body>
        </html>
    `;

    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
}
