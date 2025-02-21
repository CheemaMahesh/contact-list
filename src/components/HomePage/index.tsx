"use client";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import EmptyState from '../EmptyState';
import useData from "../Hooks/useData";
import Table from "../Table";

interface DetailsInterface {
    name: string;
    contact: string;
}

interface ContactsInterface {
    id: number;
    title: string;
    contact: string;
}

const Home = () => {
    const [token, setToken] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [details, setDetails] = useState<DetailsInterface>({
        name: "",
        contact: "",
    });
    const [userName, setUserName] = useState<string>("");
    const [currentId, setCurrentId] = useState<number>(0);

    const [contactsList, setContactsList] = useState<ContactsInterface[]>([]);
    const [cLoad, setCLoad] = useState<boolean>(false);
    const [hLoad, setHLoad] = useState<boolean>(false);

    const { postData, getData, updateData, deleteData } = useData();

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

    const handleChange = (type: string, value: string) => {
        if (type === "contact" && value.length > 10) {
            alert("Please enter a valid contact number");
            return;
        }
        setDetails(prev => ({ ...prev, [type]: value }));
    };

    const getContacts = async (token: string) => {
        setHLoad(true);
        const res = await getData({ token });
        if (res?.status === 200) {
            setContactsList(res?.data?.contacts as ContactsInterface[]);
            setUserName(res?.data?.name as string)
        }
        setHLoad(false);
    }
    const handleDelete = async ({ id }: { name?: string, contact?: string, id: number }) => {
        const res = await deleteData({
            token: token as string,
            id: id,
        });
        if (res?.status === 200) {
            getContacts(token as string);
        }
    }
    const handleUpdate = ({ name, contact, id }: {name?: string, contact?: string, id: number}) => {
        setDetails({
            name: String(name),
            contact: String(contact),
        });
        handleOpenModal();
        setCurrentId(id);
    }

    useEffect(() => {
        const token = localStorage.getItem("contacts-token");
        if (!token) {
            window.location.href = "/signin";
            return;
        }
        token && getContacts(token);
        setToken(token);
    }, []);

    const callUpdate = async () => {
        setCLoad(true);
        const res = await updateData({
            token: token as string,
            id: currentId,
            name: details?.name as string,
            contact: details?.contact as string,
        });

        if(res?.status === 200) {
            getContacts(token as string);
            handleCloseModal();
            setCurrentId(0);
        }
        setCLoad(false);
    };

    const handleAddContact = async () => {
        setCLoad(true);
        if (details?.name && details?.contact) {
            const res = await postData({
                name: details?.name,
                contact: details?.contact,
                token: token as string,
            });
            if (res?.status === 200) {
                setDetails({
                    name: "",
                    contact: "",
                });
                handleCloseModal();
                getContacts(token as string);
            }
        }
        setCLoad(false);
    };

    return (
        <section className="flex flex-col items-center w-screen h-screen bg-gradient-to-r from-blue-400 to-white">
            <div className="w-full h-fit p-6 flex justify-end gap-8">
                <button className="q_b_clasic_add" onClick={handleOpenModal}>Add Contact</button>
                <button className="quick-clasic-button" onClick={handleClear}>LogOut</button>
            </div>
            <div className="w-full h-fit p-6">
                <p className="text-4xl font-mono font-semibold">Hello <span className="font-bold text-5xl">{userName}!</span> Welcome to Your Contact List</p>
            </div>
            <div>
                {contactsList.length > 0 ? <Table contactsList={contactsList} onDelete={handleDelete} onUpdate={handleUpdate} /> : <EmptyState load={hLoad} handleOpenModal={handleOpenModal} />}
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} load={cLoad}>
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
                        onChange={(e) => handleChange("name", e.target.value)}
                        value={details?.name}
                    />

                    <label htmlFor="contact" className="text-lg font-semibold text-gray-700 mb-2">Contact Number</label>
                    <input
                        id="contact"
                        type="number"
                        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 mb-4"
                        placeholder="Enter contact number"
                        onChange={(e) => handleChange("contact", e.target.value)}
                        value={details?.contact}
                    />
                    <button onClick={currentId ? callUpdate : handleAddContact} disabled={!details?.name || !details?.contact || Number(details?.contact) < 10} className="bg-gray-600 text-white mt-4 w-full py-2 rounded-md shadow hover:bg-gray-700 transition duration-200">Add Contact</button>
                </div>
            </Modal>

        </section>
    );
};

export default Home;