
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { loginOptions } from "@/lib/login-options";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LoginCard } from "@/components/auth/login-card";
import { User } from "lucide-react";

export default function LoginPage() {
    return (
        <Card className="w-full max-w-4xl mx-auto bg-card/80 backdrop-blur-md border">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl">Portal de Acceso</CardTitle>
                <CardDescription>Selecciona el portal al que deseas acceder.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loginOptions.map((option) => (
                    <Link key={option.href} href={option.href} className="block hover:shadow-lg transition-shadow rounded-xl">
                        <Card className="h-full flex flex-col">
                            <CardHeader className="flex-row items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <option.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">{option.label}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription>{option.description}</CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">
                                    Acceder <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </CardContent>
        </Card>
    );
}
