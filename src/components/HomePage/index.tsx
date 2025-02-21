"use client";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import EmptyState from '../EmptyState';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("contacts-token");
        if (!token) {
            window.location.href = "/signin";
            return;
        }
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleClear = () => {
        localStorage.removeItem("contacts-token");
        window.location.href = "/signin";
    }

    return (
        <section className="flex flex-col items-center w-screen h-screen bg-gradient-to-r from-blue-400 to-white">
            <div className="w-full h-fit p-6 flex justify-end gap-8">
                <button className="q_b_clasic_add" onClick={handleOpenModal}>Add Contact</button>
                <button className="quick-clasic-button" onClick={handleClear}>LogOut</button>
                {/* <button className="quick-clasic-button" onClick={handleOpenModal}>Add Contact</button> */}
            </div>
            <div className="w-full h-fit p-6">
                <p className="text-4xl font-mono font-semibold">Hello <span className="font-bold text-5xl">Mahesh!</span> Welcome to Your Contact List</p>
            </div>
            <div>
                <EmptyState handleOpenModal={handleOpenModal} />
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
    <div className="flex justify-end w-full">
        <p className="cursor-pointer rounded-full w-fit h-fit p-2 px-4 text-gray-600 hover:text-gray-800 transition duration-200" onClick={handleCloseModal}>
            &times;
        </p>
    </div>
    <div className="flex flex-col w-full max-w-md mx-auto bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add Contact</h2>
        
        <label htmlFor="name" className="text-lg font-semibold text-gray-700 mb-2">Name</label>
        <input
            id="name"
            type="text"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 mb-4"
            placeholder="Enter Name"
        />
        
        <label htmlFor="contact" className="text-lg font-semibold text-gray-700 mb-2">Contact Number</label>
        <input
            id="contact"
            type="tel"
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 mb-4"
            placeholder="Enter contact number"
        />
        
        <button className="bg-gray-600 text-white mt-4 w-full py-2 rounded-md shadow hover:bg-gray-700 transition duration-200">Add Contact</button>
    </div>
</Modal>

        </section>
    );
};

export default Home;