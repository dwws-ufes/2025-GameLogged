import React from "react";
import {Card, CardHeader, Avatar, Button} from "@heroui/react";

interface FriendCardProps {
    friend: {
        id: string;
        name: string;
        avatarUrl?: string;
        isFollowing?: boolean; // Para controle de estado externo
    };
    onFollowToggle?: (friendId: string, newState: boolean) => void;
    variant?: 'follower' | 'following'; // Diferenciação visual
}

export default function FriendCard({friend, onFollowToggle, variant = 'following'}: FriendCardProps) {
    const [isFollowed, setIsFollowed] = React.useState(friend.isFollowing || false);

    const handleFollowToggle = () => {
        const newState = !isFollowed;
        setIsFollowed(newState);
        if (onFollowToggle) {
            onFollowToggle(friend.id, newState);
        }
    };

    return (
        <Card className="max-w-[1000px] z-10 border-2 rounded-xl border-gray-200 dark:border-gray-700">
            <CardHeader className="justify-self-auto">
                <div className="flex gap-4 items-center justify-between w-full">
                    <div className="flex gap-3 items-center">
                        <Avatar
                            isBordered
                            radius="full"
                            size="lg"
                            src={friend.avatarUrl || "https://github.com/shadcn.png"}
                            imgProps={{
                                className: "object-cover w-10 h-10",
                            }}
                        />
                        <h4 className="text-small font-semibold leading-none text-default-600 truncate max-w-[150px]">
                            {friend.name}
                        </h4>
                    </div>

                    {variant === 'follower' && (
                        <Button
                            className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
                            color="primary"
                            radius="full"
                            size="sm"
                            variant={isFollowed ? "ghost" : "solid"}
                            onPress={handleFollowToggle}
                        >
                            {isFollowed ? "Unfollow" : "Follow"}
                        </Button>
                    )}
                </div>
            </CardHeader>
        </Card>
    );
}