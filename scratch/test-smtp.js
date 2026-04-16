
const nodemailer = require('nodemailer');
require('dotenv').config();

async function test() {
    console.log('--- Probando Conexión SMTP ---');
    console.log('User:', process.env.GMAIL_USER);
    
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    try {
        await transporter.verify();
        console.log('✅ Conexión SMTP exitosa');

        const info = await transporter.sendMail({
            from: `"System Kyron" <${process.env.GMAIL_USER}>`,
            to: 'natanalemattar@gmail.com',
            subject: 'Prueba de Sistema - System Kyron',
            text: '¡Hola! Este es un correo de prueba para verificar que el sistema de notificaciones de System Kyron está funcionando correctamente.',
            html: `
                <div style="font-family: sans-serif; padding: 20px; background-color: #060D1F; color: #F1F5F9; border-radius: 10px;">
                    <h1 style="color: #0EA5E9;">System Kyron</h1>
                    <p>Esta es una prueba de envío exitosa para <b>natanalemattar@gmail.com</b>.</p>
                    <div style="background: #0A1530; padding: 20px; border: 1px solid #0EA5E9; border-radius: 8px; text-align: center;">
                        <p style="margin: 0; font-size: 12px; color: #94A3B8;">CÓDIGO DE PRUEBA</p>
                        <p style="margin: 10px 0; font-size: 32px; font-weight: bold; color: #0EA5E9;">123456</p>
                    </div>
                </div>
            `
        });

        console.log('✅ Correo enviado con éxito. ID:', info.messageId);
    } catch (error) {
        console.error('❌ Error detallado:', error);
    }
}

test();
