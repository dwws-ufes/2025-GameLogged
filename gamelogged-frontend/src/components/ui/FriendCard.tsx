import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@heroui/react";

export default function FriendCard() {
    const [isFollowed, setIsFollowed] = React.useState(false);

    return (
        <Card className="max-w-[1000px] z-10 border-2 rounded-xl border-gray-200 dark:border-gray-700">
            <CardHeader className="justify-between">
                <div className="flex gap-50 items-center justify-between">
                    <Avatar
                        isBordered
                        radius="full"
                        size="lg"
                        src="https://github.com/shadcn.png"
                        imgProps={{
                            className: "object-cover w-25 h-25 align-center",
                        }}
                    />
                    <div className="flex flex-col gap-2 items-end justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                        <Button
                            className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
                            color="primary"
                            radius="full"
                            size="sm"
                            variant={isFollowed ? "bordered" : "solid"}
                            onPress={() => setIsFollowed(!isFollowed)}
                        >
                            {isFollowed ? "Unfollow" : "Follow"}
                        </Button>
                    </div>
                </div>

            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">

            </CardBody>
            <CardFooter className="gap-3">

            </CardFooter>
        </Card>
    );
}

