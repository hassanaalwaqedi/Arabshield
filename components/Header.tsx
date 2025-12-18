"use client";

import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLocale } from 'next-intl';

export function Header() {
    const locale = useLocale();
    const isRTL = locale === 'ar';

    return (
        <header className={`
            w-full py-4 px-6 mb-4
            flex items-center
            ${isRTL ? 'justify-end' : 'justify-end'}
        `}>
            {/* 
               User requested: 
               - Top-left for Arabic (RTL) -> In RTL mode, 'start' is Right, 'end' is Left. 
                 So 'justify-end' in RTL puts it on the LEFT. 
               - Top-right for English (LTR) -> In LTR mode, 'start' is Left, 'end' is Right.
                 So 'justify-end' in LTR puts it on the RIGHT.
               
               Therefore: 'justify-end' works for BOTH if we want logical "end" of the reading direction?
               Wait. 
               RTL: Start = Right, End = Left.
               LTR: Start = Left, End = Right.
               
               User wants:
               - Arabic (RTL): Top-Left. (This is 'End')
               - English (LTR): Top-Right. (This is 'End')

               So 'justify-end' is correct for both directions to place it in the "corner" opposite the start.
            */}
            <div className="flex items-center gap-4">
                <LanguageSwitcher showLabel={true} />
            </div>
        </header>
    );
}
