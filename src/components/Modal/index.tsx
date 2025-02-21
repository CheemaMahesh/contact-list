"use client";
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                {children}
            </div>
        </div>
    );
};

export default Modal;