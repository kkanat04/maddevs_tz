"use client";

import { ReactNode, useEffect } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
};

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
}: ModalProps) {
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <button
                type="button"
                aria-label="Close modal"
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <div
                role="dialog"
                aria-modal="true"
                className="
          relative z-10 w-full max-w-md
          rounded-2xl border border-neutral-200
          bg-white p-6 shadow-xl
        "
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-neutral-950">
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="
              flex h-8 w-8 items-center justify-center
              rounded-lg text-neutral-500
              transition hover:bg-neutral-100
              hover:text-neutral-900
            "
                    >
                        ×
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}
