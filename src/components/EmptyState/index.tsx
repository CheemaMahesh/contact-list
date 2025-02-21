"use client";
import Image from "next/image";
import Empty from '../../Assets/empty.png';

interface EmptyStateProps {
    handleOpenModal: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ handleOpenModal }) =>{
    return (
        <section className="flex flex-col itmes-center w-[80vw] m-auto h-[60vh] bg-[#FFF] rounded-md mt-6 text-3xl font-semibold text-gray-700 ">
            <Image className="max-w-[65%] max-h-[65%] object-contain" src={Empty} alt="Empty" />
            <p className="px-12 p-1">OOPS! Nothing here, Click on the button below to add a new contact</p>
            <div className="w-full flex justify-end items-center p-2 max-md:hidden">
            <button style={{ backgroundColor: "#1aa81f" }} className="q_b_clasic_add w-fit" onClick={handleOpenModal}>Add Contact</button>
            </div>
        </section>
    );
};

export default EmptyState;