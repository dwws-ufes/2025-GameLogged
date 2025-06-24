import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthViewModel } from "@/viewModels/AuthViewModel";

interface LoginCardProps {
    onSwitchToRegister: () => void;
    onLoginSuccess?: () => void;
}

function LoginCard({ onSwitchToRegister, onLoginSuccess }: LoginCardProps) {
    const authViewModel = new AuthViewModel();
    const {
        formData,
        isLoading,
        error,
        handleInputChange,
        handleSubmit
    } = authViewModel.useLoginViewModel();

    const onSubmit = async (e: React.FormEvent) => {
        const success = await handleSubmit(e);
        if (success) {
            onLoginSuccess?.();
        }
    };
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>            <CardContent>
                <form onSubmit={onSubmit}>
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
                                placeholder="m@example.com"
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
                    </div>
                </form>
            </CardContent><CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full" onClick={onSubmit} disabled={isLoading}>
                    {isLoading ? 'Entrando...' : 'Login'}
                </Button>
                <Button variant="outline" className="w-full" onClick={onSwitchToRegister}>
                    Não tem uma conta? Cadastre-se
                </Button>
            </CardFooter>
        </Card>
    )
}

export default LoginCard;