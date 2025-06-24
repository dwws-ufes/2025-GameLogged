import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthViewModel } from "@/viewModels/AuthViewModel";

interface CadastroCardProps {
    onSwitchToLogin: () => void;
}

function CadastroCard({ onSwitchToLogin }: CadastroCardProps) {
    const authViewModel = new AuthViewModel();
    const {
        formData,
        isLoading,
        error,
        handleInputChange,
        handleSubmit
    } = authViewModel.useRegisterViewModel();

    const onSubmit = async (e: React.FormEvent) => {
        const success = await handleSubmit(e, onSwitchToLogin);
        if (success) {
            alert('Cadastro realizado com sucesso! Você pode fazer login agora.');
        }
    };
    
    return (<Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle>Cadastro</CardTitle>
        </CardHeader>        <CardContent>
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
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="confirmPassword">Repita a Senha</Label>
                        </div>
                        <Input 
                            id="confirmPassword" 
                            name="confirmPassword"
                            type="password" 
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required 
                        />
                    </div>
                </div>
            </form>        </CardContent><CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" onClick={onSubmit} disabled={isLoading}>
                {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
            <Button variant="outline" className="w-full" onClick={onSwitchToLogin}>
                Já possui uma conta? Faça o login
            </Button>
        </CardFooter>
    </Card>
    )
}

export default CadastroCard;