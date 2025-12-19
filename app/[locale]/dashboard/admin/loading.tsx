/**
 * Admin Loading Skeleton
 * Shows animated skeleton while admin pages load
 */

export default function AdminLoading() {
    return (
        <div className="min-h-screen bg-background text-foreground p-6 animate-pulse" dir="rtl">
            {/* Header */}
            <div className="border-b border-border pb-6 mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-muted rounded-xl"></div>
                        <div>
                            <div className="h-6 w-40 bg-muted rounded mb-2"></div>
                            <div className="h-3 w-24 bg-muted/50 rounded"></div>
                        </div>
                    </div>
                    <div className="h-10 w-32 bg-muted rounded-xl"></div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-card/50 border border-border rounded-xl p-6">
                        <div className="h-3 w-20 bg-muted rounded mb-3"></div>
                        <div className="h-7 w-28 bg-muted rounded"></div>
                    </div>
                ))}
            </div>

            {/* Table/List */}
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-card/50 border border-border rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="h-10 w-10 bg-muted rounded-lg"></div>
                                <div className="flex-1">
                                    <div className="h-4 w-48 bg-muted rounded mb-2"></div>
                                    <div className="h-3 w-32 bg-muted/50 rounded"></div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div className="h-8 w-8 bg-muted rounded-lg"></div>
                                <div className="h-8 w-8 bg-muted rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
