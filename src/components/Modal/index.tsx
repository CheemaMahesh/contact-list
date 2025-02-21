"use client";
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: any;
    load: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, load }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                {load ? <div className="flex w-full h-full items-center justify-center">
                    <div className="loader max-sm:w-[200px] max-sm:h-[200px]"></div>
                    <style jsx>{`
                .loader {
                    border: 8px solid #f3f3f3;
                    border-top: 8px solid #3498db;
                    border-radius: 50%;
                    width: 200px;
                    height: 200px;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
                </div>
                    : children}
            </div>
        </div>
    );
};

export default Modal;