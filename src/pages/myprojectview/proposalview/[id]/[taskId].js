import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import Web3Modal from "web3modal";
import { contractAddress } from "../../../../../blockchain/config";
import JobPortal from "../../../../../blockchain/artifacts/contracts/JobPortal.sol/JobPortal.json";
import { ethers } from "ethers";
import Head from "next/head"
import ProposalModal from '@/components/ProposalModal'
import TaskSubmitModal from '@/components/TaskSubmitModal'
import axios from 'axios'
import Image from 'next/image';
import ProposalCard from '@/components/ProposalCard';


export default function TaskInfo() {
    const { asPath } = useRouter()
    const [taskDisplayDetails, setDisplayTaskDetails] = useState([]);
    console.log(asPath);
    let projectId = asPath.split('/')[3];
    // console.log(projectId);
    let taskId = asPath.split('/')[4];
    // console.log(taskId);
    const [proposals, setProposal] = useState([]);
    useEffect(() => {
        async function getTask() {
            console.log("tasks");
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const jobPortal = new ethers.Contract(
                contractAddress,
                JobPortal.abi,
                signer
            );
            const task = await jobPortal.getTaskData(projectId, taskId);
            console.log(task);
            const meta = await axios.get(task[0]);
            // console.log(meta.data);
            // convert the array to object
            const taskObj = {
                uri: task[0],
                Id: task[1].toNumber(),
                stakedAmount: task[2].toNumber(),
                proposalCount: task[3].toNumber(),
                worker: task[4],
                isComplete: task[5],
                isReviewed: task[6],
                onGoing: task[7],
                taskName: meta.data.taskName,
                taskDescription: meta.data.taskDescription,
                taskDuration: meta.data.taskDuration,
            };
            console.log(taskObj);
            setDisplayTaskDetails(taskObj);
        }
        getTask();
        async function getProposals() {
            console.log("proposal");
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const jobPortal = new ethers.Contract(
                contractAddress,
                JobPortal.abi,
                signer
            );
            const proposalDetails = await jobPortal.getProposalsByTaskId(projectId, taskId);
            console.log(proposalDetails);
            if (proposalDetails.length === 0) {
                return;
            }
            const data = await Promise.all(
                proposalDetails.map(async (proposals) => {
                    const meta = await axios.get(proposals[2]);
                    console.log(meta.data);
                    // convert the array to object
                    const proposalObj = {
                        uri: proposals[2],
                        worker: proposals[3],
                        bid: proposals[4].toNumber(),
                        motivation: meta.data.motivation,
                        proposalDescription: meta.data.proposalDetails,
                        projectId: projectId,
                        taskId: taskId,
                        // setDisplayTaskDetails(proposalObj);
                    }
                    return proposalObj;
                }))
            console.log(data);
            setProposal(data);
            console.log(proposals);
        }
        getProposals();
    }, []);


    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log(proposal);
    // };
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
                <div className="py-1 h-64 w-9/12 border-2 border-slate-700 rounded-xl my-8 px-5">
                    <div className='flex flex-col md:flex-row my-4'>
                        <h3 className="text-lg font-semibold md:ml-2">
                            Task Name:
                        </h3>

                        <p className="text-sm md:ml-2 mt-1">
                            {taskDisplayDetails.taskName}
                        </p>
                    </div>
                    <div className='flex flex-col md:flex-row my-4'>
                        <h3 className="text-lg font-semibold md:ml-2">
                            Description:
                        </h3>

                        <p className="text-sm md:ml-2 mt-1">
                            {taskDisplayDetails.taskDescription}
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
                            {
                                taskDisplayDetails.stakedAmount
                            }
                        </p>
                    </div>
                    <div className='flex flex-col md:flex-row my-4'>
                        <h3 className="text-lg font-semibold md:ml-2">
                            Duration
                        </h3>
                        <p className="text-sm md:ml-2 mt-1">
                            {
                                taskDisplayDetails.taskDuration
                            }
                        </p>
                    </div>
                </div>

                {!taskDisplayDetails.onGoing && !taskDisplayDetails.isComplete && !taskDisplayDetails.isReviewed && (
                    <>
                        <h1 className="text-2xl font-bold my-2 md:ml-2">Proposals</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                            {proposals.map((proposal) => {
                                return (
                                    <ProposalCard key={proposal.uri}
                                        proposal={proposal} />
                                )
                            })
                            }

                        </div>
                    </>
                )
                }
                {taskDisplayDetails.onGoing && <p className="text-sm md:ml-2 mt-1">
                    Show Developer details and proposal details
                </p>
                }
                {taskDisplayDetails.isComplete && <p className="text-sm md:ml-2 mt-1">
                    Show for isComplete
                </p>
                }
                {taskDisplayDetails.isReviewed && <p className="text-sm md:ml-2 mt-1">
                    Show for isReviewed
                </p>
                }
            </section>

        </>
    )
}
