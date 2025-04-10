import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoMoreThink",
  description: "NoMoreThink",
  headers: {
    'Cache-Control': 'no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  }
}; 