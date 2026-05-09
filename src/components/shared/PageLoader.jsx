import React from 'react';
import { Loader2 } from 'lucide-react';

const PageLoader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0C0D0D]">
            <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
        </div>
    );
};

export default PageLoader;
