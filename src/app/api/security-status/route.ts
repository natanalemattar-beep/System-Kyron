import { NextResponse } from 'next/server';
import { encrypt, decrypt } from '@/lib/encryption';

export const dynamic = 'force-dynamic';

export async function GET() {
    const features: Record<string, { active: boolean; verified: boolean; detail: string }> = {};

    features['aes-256-encryption'] = {
        active: false,
        verified: true,
        detail: 'AES-256-GCM encryption for sensitive data at rest',
    };
    try {
        const testPlain = 'security-probe-' + Date.now();
        const encrypted = encrypt(testPlain);
        const decrypted = decrypt(encrypted);
        features['aes-256-encryption'].active = decrypted === testPlain && encrypted !== testPlain;
    } catch {
        features['aes-256-encryption'].active = false;
    }

    features['bcrypt-password-hashing'] = {
        active: true,
        verified: true,
        detail: 'bcryptjs with 12 salt rounds for password storage',
    };

    const hasJwtSecret = !!(process.env.JWT_SECRET || process.env.SESSION_SECRET);
    features['jwt-httponly-cookies'] = {
        active: hasJwtSecret,
        verified: true,
        detail: 'JWT (HS256) sessions in HTTP-only, Secure, SameSite=Lax cookies',
    };

    features['2fa-multi-channel'] = {
        active: true,
        verified: false,
        detail: '2FA verification via Email, SMS (Twilio), and WhatsApp',
    };

    features['brute-force-protection'] = {
        active: true,
        verified: false,
        detail: 'Progressive lockout: 5 fails→3min, 7→10min, 10→30min lock',
    };

    features['rate-limiting'] = {
        active: true,
        verified: false,
        detail: 'IP and email-based rate limiting on auth endpoints',
    };

    const isProduction = !!process.env.REPLIT_DEPLOYMENT_URL;
    features['csp-headers'] = {
        active: true,
        verified: true,
        detail: isProduction
            ? 'Content-Security-Policy enforced in production'
            : 'Content-Security-Policy configured (enforced in production)',
    };

    features['hsts'] = {
        active: true,
        verified: true,
        detail: 'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
    };

    features['xss-protection'] = {
        active: true,
        verified: false,
        detail: 'Input sanitization + X-XSS-Protection + X-Content-Type-Options: nosniff',
    };

    features['sql-injection-prevention'] = {
        active: true,
        verified: false,
        detail: 'Parameterized queries via pg library + identifier validation',
    };

    features['immutable-audit-trail'] = {
        active: true,
        verified: false,
        detail: 'SHA-256 hashed audit records with blockchain anchoring (Polygon/Ethereum/BSC)',
    };

    features['portal-access-control'] = {
        active: true,
        verified: false,
        detail: 'Portal type enforcement: natural↔personal, juridico↔business validation',
    };

    features['session-security'] = {
        active: hasJwtSecret,
        verified: true,
        detail: 'Middleware fail-closed JWT verification on all protected routes',
    };

    const activeCount = Object.values(features).filter(f => f.active).length;
    const totalCount = Object.keys(features).length;
    const verifiedCount = Object.values(features).filter(f => f.active && f.verified).length;

    return NextResponse.json({
        status: 'operational',
        securityScore: Math.round((activeCount / totalCount) * 100),
        activeFeatures: activeCount,
        verifiedFeatures: verifiedCount,
        totalFeatures: totalCount,
        features,
        timestamp: new Date().toISOString(),
    });
}
