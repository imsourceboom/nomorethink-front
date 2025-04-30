'use client';

import AppPageLayout from '@/app/components/AppPageLayout';

export default function Settings() {
    return (
        <AppPageLayout>
            <div className="w-full">
                <div className="flex items-center justify-between mt-4 mb-10">
                    <h1 className="text-2xl font-bold text-white">설정</h1>
                </div>
            </div>
            <div className="w-[90vw] max-w-md bg-[#18181b] rounded-2xl shadow-lg p-2 flex flex-col gap-1">
                {/* 언어 */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#232329]">
                    <span className="text-lg text-[#e5e5e5]">언어</span>
                    <div className="flex items-center gap-1">
                        <span className="text-[#3784ff] font-medium mr-2">
                            한국어
                        </span>
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
</svg>
                    </div>
                </div>
                {/* 알림 */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#232329]">
                    <span className="text-lg text-[#e5e5e5]">알림</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
</svg>
                </div>
                {/* 화면 테마 */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#232329]">
                    <span className="text-lg text-[#e5e5e5]">화면 테마</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
</svg>
                </div>
                {/* API 관리 */}
                <div className="flex items-center justify-between px-6 py-5">
                    <span className="text-lg text-[#e5e5e5]">API Key 관리</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
</svg>
                </div>
            </div>
        </AppPageLayout>
    );
}
