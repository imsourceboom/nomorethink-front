interface DashboardProps {
    title: string;
    description: string;
}

export default function Dashboard({ title, description }: DashboardProps) {
    return (
        <div className="w-full text-center space-y-4 mb-8">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-lg opacity-90">
                {description}
            </p>
        </div>
    );
} 