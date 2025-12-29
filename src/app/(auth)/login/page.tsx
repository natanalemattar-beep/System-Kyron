
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

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-5xl mx-auto bg-card/80 backdrop-blur-md border-2 border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl">
                <CardHeader className="text-center p-8">
                    <CardTitle className="text-4xl font-bold text-gray-800 dark:text-white">Portal de Acceso</CardTitle>
                    <CardDescription className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                        Selecciona el portal al que deseas acceder.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loginOptions.map((option) => (
                        <Link key={option.href} href={option.href} className="block group">
                            <Card className="h-full flex flex-col transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:shadow-2xl rounded-xl overflow-hidden border-gray-200 dark:border-gray-700">
                                <CardHeader className="flex-row items-center gap-4 p-6 bg-gray-50 dark:bg-gray-800">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <option.icon className="h-7 w-7 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">{option.label}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow p-6">
                                    <CardDescription className="text-base text-gray-600 dark:text-gray-400">{option.description}</CardDescription>
                                </CardContent>
                                <CardFooter className="p-6 bg-gray-50 dark:bg-gray-800">
                                    <Button variant="outline" className="w-full transition-all duration-300 ease-in-out group-hover:bg-primary group-hover:text-white">
                                        Acceder <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
