"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityInit() {
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_CLARITY_ID) {
            Clarity.init(process.env.NEXT_PUBLIC_CLARITY_ID);
        }
    }, []);

    return null;
}
