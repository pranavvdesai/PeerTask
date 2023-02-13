import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import Preferences from '@/components/Tasks'
import Head from "next/head"
import ProposalModal from '@/components/ProposalModal'
import TaskSubmitModal from '@/components/TaskSubmitModal'


const TaskInfo = () => {
    const [modal, setModal] = useState(false)
    const [taskModal, setTaskModal] = useState(false)
    const router = useRouter()
    const { id } = router.query
    const [proposal, setProposal] = useState([]);
    const [motivation, setMotivation] = useState("");
    const [bid, setBid] = useState("");
    const [duration, setDuration] = useState("");
    const [proposalDetails, setProposalDetails] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(proposal);
    };
    return (
        <>
            <Head>
                <title>PeerTask</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <section className="bg-black text-white pb-6 px-10">
                <h1 className="text-2xl font-bold my-2 md:ml-2">Project Name</h1>
                <p className="text-sm md:ml-2 mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore atque ea aut error aliquam, molestiae ipsum perspiciatis exercitationem quisquam! Ducimus cupiditate dolore voluptates assumenda accusantium!
                </p>
                <div className="py-7 h-96 w-9/12 border-2 border-slate-700 rounded-xl my-8 px-5">
                    <div className='flex flex-col md:flex-row my-4'>
                        <h3 className="text-lg font-semibold md:ml-2">
                            Task Name:
                        </h3>

                        <p className="text-sm md:ml-2 mt-1">
                            Build responsive Navbar
                        </p>
                    </div>
                    <div className='flex flex-col md:flex-row my-4'>
                        <h3 className="text-lg font-semibold md:ml-2">
                            Description:
                        </h3>

                        <p className="text-sm md:ml-2 mt-1">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet quos ullam, architecto maxime repellendus id corporis? Veritatis natus quia repellendus?
                        </p>
                    </div>
                    <div className='flex flex-col md:flex-row my-4'>
                        <h3 className="text-lg font-semibold md:ml-2">
                            Category:
                        </h3>

                        <span className='
                            text-sm
                            md:ml-3
                            bg-slate-700
                            rounded-xl
                            px-2
                            py-1
                            text-white
                            font-semibold
                            
                        '>
                            UI/UX
                        </span>
                        <span className='
                            text-sm
                            md:ml-2
                            bg-slate-700
                            rounded-xl
                            px-2
                            py-1
                            text-white
                            font-semibold
                            
                        '>
                            Web Development
                        </span>
                    </div>
                    <div className='flex flex-col md:flex-row my-4'>
                        <h3 className="text-lg font-semibold md:ml-2">
                            Reward:
                        </h3>

                        <p className="text-sm md:ml-2 mt-1">
                            0.5ETH
                        </p>
                    </div>
                    <div className='flex flex-col md:flex-row my-4'>
                        <h3 className="text-lg font-semibold md:ml-2">
                            Duration
                        </h3>
                        <p className="text-sm md:ml-2 mt-1">
                            2 weeks
                        </p>
                    </div>
                    <button
                        onClick={() => setModal(true)}
                        className='
                        bg-[#0284c7]
                        text-white
                        font-semibold
                        rounded-xl
                        px-4
                        py-2
                        mt-4
                        md:ml-2
                    '>
                        Submit Proposal
                    </button>
                    {
                        modal && <ProposalModal setModal={setModal}
                            proposal={proposal}
                            setProposal={setProposal}
                            motivation={motivation}
                            setMotivation={setMotivation}
                            bid={bid}
                            setBid={setBid}
                            duration={duration}
                            setDuration={setDuration}
                            proposalDetails={proposalDetails}
                            setProposalDetails={setProposalDetails}
                            handleSubmit={handleSubmit}
                        />
                    }

                    <button
                        onClick={() => setTaskModal(true)}
                        className='
                        bg-[#0284c7]
                        text-white
                        font-semibold
                        rounded-xl
                        px-4
                        py-2
                        mt-4
                        md:ml-2
                    '>
                        Submit task
                    </button>
                    {
                        taskModal && <TaskSubmitModal setTaskModal={setTaskModal} />
                    }
                </div>
            </section>
        </>
    )
}

export default TaskInfo