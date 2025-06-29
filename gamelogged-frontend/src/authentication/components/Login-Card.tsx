import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AuthController } from "../controllers/AuthController";

interface LoginCardProps {
    onSwitchToRegister: () => void;
}

function LoginCard({ onSwitchToRegister }: LoginCardProps) {
    const {
        formData,
        isLoading,
        error,
        handleInputChange,
        handleSubmit
    } = AuthController.useLoginForm();

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-6">
                        {error && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                                {error}
                            </div>
                        )}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="example@domain.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Senha</Label>
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Esqueceu a senha?
                                </a>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Entrando...' : 'Login'}
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Separator className="my-4" />
                <Button variant="outline" className="w-full" onClick={onSwitchToRegister}>
                    Não tem uma conta? Cadastre-se
                </Button>
            </CardFooter>
        </Card>
    )
}

export default LoginCard;