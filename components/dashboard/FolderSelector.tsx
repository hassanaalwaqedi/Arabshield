/**
 * Folder Selector Component
 * Select existing folder or create new one
 */

'use client';

import { useState } from 'react';
import { FolderPlus, Folder } from 'lucide-react';

interface FolderSelectorProps {
    folders: string[];
    selectedFolder: string;
    onSelect: (folder: string) => void;
}

export default function FolderSelector({ folders, selectedFolder, onSelect }: FolderSelectorProps) {
    const [isCreating, setIsCreating] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');

    const handleCreateFolder = () => {
        if (newFolderName.trim()) {
            onSelect(newFolderName.trim());
            setNewFolderName('');
            setIsCreating(false);
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">المجلد</label>

            {!isCreating ? (
                <div className="flex gap-2">
                    <select
                        value={selectedFolder}
                        onChange={(e) => onSelect(e.target.value)}
                        className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                        <option value="">بدون مجلد</option>
                        {folders.map(folder => (
                            <option key={folder} value={folder}>{folder}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors flex items-center gap-2"
                    >
                        <FolderPlus size={18} />
                        <span>جديد</span>
                    </button>
                </div>
            ) : (
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <Folder className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                            placeholder="اسم المجلد الجديد..."
                            autoFocus
                            className="w-full pr-10 pl-4 py-2.5 bg-white border border-blue-500 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                    <button
                        onClick={handleCreateFolder}
                        disabled={!newFolderName.trim()}
                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        إنشاء
                    </button>
                    <button
                        onClick={() => {
                            setIsCreating(false);
                            setNewFolderName('');
                        }}
                        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                    >
                        إلغاء
                    </button>
                </div>
            )}
        </div>
    );
}
