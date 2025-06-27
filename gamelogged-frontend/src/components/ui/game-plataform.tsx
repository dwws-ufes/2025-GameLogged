function GamePlataform({ platforms }: { platforms: string[] }) {
    const plataformColors: { [key: string]: string } = {
        "PlayStation 5": "bg-blue-600",
        "Xbox Series X/S": "bg-green-600",
        "PC": "bg-gray-400",
        "Nintendo Switch": "bg-red-600",
        "PlayStation 4": "bg-blue-600",
        "Xbox One": "bg-green-600",
        "Nintendo 3DS": "bg-red-600",
        "Xbox 360": "bg-green-600",
        "PlayStation 3": "bg-blue-600",
        "Wii U": "bg-red-600",
        "Wii": "bg-red-600",
        "Nintendo DS": "bg-red-600",
        "PS Vita": "bg-blue-600",
        "Android": "bg-green-500",
        "iOS": "bg-purple-700",
        "Mac": "bg-gray-400",
        "Linux": "bg-gray-400",
        "default": "bg-purple-500"
    }


    return (
        <div className="game-platforms">
            {platforms.map((platform, index) => (
                <button key={index}>
                    <span
                        className={`inline-flex items-center justify-center px-3 py-1.5 rounded-md text-sm font-medium text-white mr-2 mb-2 ${plataformColors[platform] || plataformColors["default"]}`}
                    >
                        {platform}
                    </span>
                </button>
            ))}
        </div>
    );
}

export default GamePlataform;