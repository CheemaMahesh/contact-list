"use client";
import React from "react";

interface ContactsInterface {
    id: number;
    title: string;
    contact: string;
}


interface TableProps {
    contactsList: ContactsInterface[];
    onDelete: ({name, contact, id}: {name?: string, contact?: string, id: number}) => void; // Function to handle delete action
    onUpdate: ({name, contact, id}: {name?: string, contact?: string, id: number}) => void; // Function to handle update action
}

const Table: React.FC<TableProps> = ({ contactsList, onDelete, onUpdate }) => {
    return (
        <div className="overflow-x-auto w-[80vw] h-[60vh] m-auto rounded-md">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Title</th>
                        <th className="py-3 px-6 text-left">Contact Number</th>
                        <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {contactsList.map((contact) => (
                        <tr key={contact.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6">{contact.title}</td>
                            <td className="py-3 px-6">{contact.contact}</td>
                            <td className="py-3 px-6 flex space-x-2">
                                <button
                                    onClick={() => onUpdate({name: contact.title, contact: contact.contact, id: contact.id})}
                                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => onDelete({name: contact.title, contact: contact.contact, id: contact.id})}
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;