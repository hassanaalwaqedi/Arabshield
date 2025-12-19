/**
 * Invoices Loading Skeleton
 * Shows animated skeleton while invoices load
 */

export default function InvoicesLoading() {
    return (
        <div className="min-h-screen bg-background text-foreground p-6 animate-pulse" dir="rtl">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 bg-muted rounded-xl"></div>
                <div>
                    <div className="h-6 w-32 bg-muted rounded mb-2"></div>
                    <div className="h-3 w-24 bg-muted/50 rounded"></div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-card/50 border border-border rounded-xl p-6">
                        <div className="h-3 w-20 bg-muted rounded mb-3"></div>
                        <div className="h-8 w-24 bg-muted rounded"></div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <div className="flex-1 h-12 bg-card/50 border border-border rounded-xl"></div>
                <div className="flex gap-2">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-12 w-20 bg-muted rounded-xl"></div>
                    ))}
                </div>
            </div>

            {/* Invoice Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-card/50 border border-border rounded-xl p-6">
                        <div className="flex justify-between mb-4">
                            <div className="h-4 w-24 bg-muted rounded"></div>
                            <div className="h-5 w-16 bg-muted rounded-full"></div>
                        </div>
                        <div className="h-8 w-32 bg-muted rounded mb-4"></div>
                        <div className="space-y-2">
                            <div className="h-3 w-full bg-muted/50 rounded"></div>
                            <div className="h-3 w-3/4 bg-muted/50 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
