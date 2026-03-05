"use client";

export default function TelecomDesignShowcasePage() {
    return (
        <div className="telecom-design-wrapper">
            <style jsx global>{`
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

                .telecom-design-body .btn {
                    display: inline-block;
                    padding: var(--spacing-sm) var(--spacing-lg);
                    border-radius: 6px;
                    font-weight: 500;
                    text-decoration: none;
                    transition: all 0.2s;
                    cursor: pointer;
                    border: none;
                }
                
                .telecom-design-body .btn-primary {
                    background: var(--color-primary);
                    color: white;
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
            `}</style>
            
            <div className="telecom-design-body">
                <header className="p-8 border-b flex justify-between items-center">
                    <div className="text-xl font-bold">TELECOM NODE</div>
                    <nav className="flex gap-8 text-sm font-medium opacity-60">
                        <span>Dashboard</span>
                        <span>Licencias</span>
                        <span>Operaciones</span>
                    </nav>
                </header>
                
                <main className="container mx-auto p-12 space-y-16">
                    <section className="hero text-center space-y-6">
                        <h1 className="hero-title">Gestión de Telecomunicaciones</h1>
                        <p className="max-w-2xl mx-auto text-lg opacity-60">Visualización de operaciones críticas y cumplimiento regulatorio CONATEL.</p>
                        <div className="flex justify-center gap-4">
                            <button className="btn btn-primary">Estado Completo</button>
                            <button className="btn border">Soporte</button>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card shadow-sm border space-y-4">
                            <h3 className="font-bold">CONATEL COMPLIANCE</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm"><span>Espectro</span> <span className="text-green-500">Activo</span></div>
                                <div className="flex justify-between text-sm"><span>ISP</span> <span className="text-green-500">Activo</span></div>
                            </div>
                        </div>
                        <div className="card shadow-sm border space-y-4">
                            <h3 className="font-bold">CLIENTES ACTIVOS</h3>
                            <div className="text-4xl font-bold">1,245</div>
                            <p className="text-xs opacity-60 uppercase tracking-widest font-black">+12 Nuevos este mes</p>
                        </div>
                        <div className="card shadow-sm border space-y-4">
                            <h3 className="font-bold">FACTURACIÓN</h3>
                            <div className="text-4xl font-bold">$45,200</div>
                            <p className="text-xs opacity-60 uppercase tracking-widest font-black">98% Cobrado</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
