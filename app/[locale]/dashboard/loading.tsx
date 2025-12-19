/**
 * Dashboard Loading Skeleton
 * Shows animated skeleton while dashboard data loads
 */

export default function DashboardLoading() {
    return (
        <div className="min-h-screen bg-background text-foreground p-6 animate-pulse" dir="rtl">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="h-8 w-48 bg-muted rounded-lg mb-2"></div>
                    <div className="h-4 w-32 bg-muted/50 rounded-lg"></div>
                </div>
                <div className="h-10 w-32 bg-muted rounded-xl"></div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-card/50 border border-border rounded-xl p-6">
                        <div className="h-4 w-24 bg-muted rounded mb-3"></div>
                        <div className="h-8 w-16 bg-muted rounded"></div>
                    </div>
                ))}
            </div>

            {/* Content Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-card/50 border border-border rounded-xl p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-12 w-12 bg-muted rounded-xl"></div>
                                <div className="flex-1">
                                    <div className="h-4 w-48 bg-muted rounded mb-2"></div>
                                    <div className="h-3 w-32 bg-muted/50 rounded"></div>
                                </div>
                            </div>
                            <div className="h-3 w-full bg-muted/30 rounded mb-2"></div>
                            <div className="h-3 w-3/4 bg-muted/30 rounded"></div>
                        </div>
                    ))}
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    <div className="bg-card/50 border border-border rounded-xl p-6">
                        <div className="h-5 w-32 bg-muted rounded mb-4"></div>
                        <div className="space-y-3">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="h-8 w-8 bg-muted rounded-full"></div>
                                    <div className="h-3 w-24 bg-muted rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
