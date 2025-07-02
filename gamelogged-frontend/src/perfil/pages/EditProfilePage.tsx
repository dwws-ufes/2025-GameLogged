import React, { useEffect, useState } from 'react';
import { userAPI } from '@/services/APIService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { AuthController } from '@/authentication/controllers/AuthController';


interface ProfileFormData {
    nickname: string;
    biography: string;
}

function EditProfilePage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ProfileFormData>({ nickname: '', biography: '' });
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    useEffect(() => {
        const fetchCurrentData = async () => {
            try {
                const currentUser = await userAPI.getCurrentUser();
                setFormData({
                    nickname: currentUser.nickname,
                    biography: currentUser.biography
                });
            } catch (error) {
                console.error("Erro ao buscar dados para edição:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCurrentData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            let newImageUrl: string | undefined;

            const dataToUpdate: { nickname: string; biography?: string; profilePictureUrl?: string } = {
                ...formData,
            };

            const currentUser = await userAPI.getCurrentUser();
            const uuid = currentUser.uuid;
            
            if (profileImageFile) {
                newImageUrl = await AuthController.getInstance().uploadProfilePicture(profileImageFile,  uuid);
                dataToUpdate.profilePictureUrl = newImageUrl;
            }

            userAPI.updateUser(dataToUpdate);
            
            navigate('/perfil');

        } catch (error) {
            console.error("Erro ao salvar perfil:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };
    
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><LoaderCircle className="h-12 w-12 animate-spin" /></div>;
    }

    return (
        <div className="container mx-auto max-w-2xl py-10">
            <h1 className="text-3xl font-bold mb-6">Editar Perfil</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="profilePicture">Foto de Perfil</Label>
                    <Input id="profilePicture" type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="nickname">Nickname</Label>
                    <Input 
                        id="nickname" 
                        name="nickname"
                        value={formData.nickname} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="biography">Biografia</Label>
                    <Textarea 
                        id="biography" 
                        name="biography"
                        value={formData.biography} 
                        onChange={handleInputChange}
                        rows={5}
                    />
                </div>
                <Button type="submit" disabled={isSaving} className="w-full">
                    {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
                <Button 
                    type="button"
                    variant="outline" 
                    className="w-full sm:w-auto" 
                    onClick={handleCancel}
                >
                    Cancelar
                </Button>
            </form>
        </div>
    );
}

export default EditProfilePage;