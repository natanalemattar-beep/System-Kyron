
"use client";

import { useState } from "react";
import { RegisterForm } from "@/components/auth/register-form";
import { User } from "lucide-react";
import { useAuth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function RegisterNaturalPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const auth = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    const handleRegister = async (formData: Record<string, string>) => {
        if (!auth) {
            setError("El servicio de autenticación no está disponible.");
            return;
        }
        setIsLoading(true);
        setError(null);
        
        const email = formData.email;
        const password = formData.password;

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast({
                title: "¡Registro Exitoso!",
                description: "Tu cuenta ha sido creada. Ahora puedes iniciar sesión.",
            });
            router.push("/login-personal");
        } catch (err: any) {
            switch (err.code) {
                case 'auth/email-already-in-use':
                    setError("Este correo electrónico ya está en uso. Intenta iniciar sesión.");
                    break;
                case 'auth/weak-password':
                    setError("La contraseña es muy débil. Debe tener al menos 6 caracteres.");
                    break;
                case 'auth/invalid-email':
                     setError("El formato del correo electrónico es inválido.");
                    break;
                default:
                    setError("Ocurrió un error inesperado durante el registro.");
                    console.error("Firebase registration error:", err);
                    break;
            }
        } finally {
            setIsLoading(false);
        }
    };

    const registerProps = {
        icon: User,
        title: "Registro Personal",
        description: "Crea tu cuenta para gestionar tus trámites personales.",
        fields: [
            { id: "fullName", label: "Nombres y Apellidos", type: "text" as const, placeholder: "Ej: Juan Pérez", required: true },
            { id: "email", label: "Correo Electrónico", type: "email" as const, placeholder: "tu@correo.com", required: true },
            { id: "password", label: "Contraseña", type: "password" as const, placeholder: "Mínimo 6 caracteres", required: true },
        ],
        submitButtonText: "Crear Cuenta",
        footerLinkHref: "/login-personal",
        footerLinkText: "Inicia sesión aquí",
        onSubmit: handleRegister,
        error: error,
        isLoading: isLoading,
    };

    return <RegisterForm {...registerProps} />;
}
