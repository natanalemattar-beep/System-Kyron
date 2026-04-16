
import { sendEmail, buildKyronEmailTemplate } from './src/lib/email-service';
import dotenv from 'dotenv';
import path from 'path';

// Cargar variables desde .env
dotenv.config();

async function test() {
    console.log('--- Iniciando prueba de envío de correo ---');
    console.log('Usando cuenta:', process.env.GMAIL_USER);
    
    const template = buildKyronEmailTemplate({
        title: 'Verificación de Acceso',
        body: 'Has solicitado un código de acceso para System Kyron. Si no fuiste tú, ignora este mensaje.',
        code: '999888'
    });

    const result = await sendEmail({
        to: 'natanalemattar@gmail.com',
        subject: 'Código de Verificación - System Kyron',
        html: template,
        purpose: 'verification'
    });

    if (result.success) {
        console.log('✅ ¡ÉXITO! El correo fue enviado a natanalemattar@gmail.com');
    } else {
        console.error('❌ ERROR al enviar:', result.error);
    }
}

test().catch(console.error);
