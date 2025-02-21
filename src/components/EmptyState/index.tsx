"use client";
import Image from "next/image";
import Empty from '../../Assets/empty.png';

interface EmptyStateProps {
    handleOpenModal: () => void;
    load: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ handleOpenModal, load }) => {
    return (
        <section className="flex flex-col itmes-center w-[80vw] m-auto h-[60vh] bg-[#FFF] rounded-md mt-6 text-3xl font-semibold text-gray-700 ">
            {load ? (<>
                <div className="flex w-full h-full items-center justify-center">
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
            </>) : (<>            <Image className="max-w-[65%] max-h-[65%] object-contain" src={Empty} alt="Empty" />
                <p className="px-12 p-1">OOPS! Nothing here, Click on the button below to add a new contact</p>
                <div className="w-full flex justify-end items-center p-2 max-md:hidden">
                    <button style={{ backgroundColor: "#1aa81f" }} className="q_b_clasic_add w-fit" onClick={handleOpenModal}>Add Contact</button>
                </div>
            </>)}

        </section>
    );
};

export default EmptyState;