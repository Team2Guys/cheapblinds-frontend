"use client"
import React, {useState } from 'react'
import dynamic from 'next/dynamic';
import DefaultLayout from 'components/Dashboard/DefaultLayout';
import { IJOBS } from 'types/carear';
const Addjobs= dynamic(() => import("./AddJobs"))
const ViewJobs = dynamic(() => import("./ViewJobs"))

function MainPage({ Jobs }: { Jobs: IJOBS[] }) {
    const [job, setjob] = useState<IJOBS | undefined>();
    const [selecteMenu, setselecteMenu] = useState<string>("All Job");

console.log(selecteMenu, "selecteMenu", job)

    return (

        <DefaultLayout>
            {selecteMenu == "Add Job" ?

                <Addjobs setjob={setjob} setselecteMenu={setselecteMenu} job={job} /> :
                <ViewJobs Jobs={Jobs} setjob={setjob} setselecteMenu={setselecteMenu} />}

        </DefaultLayout>

    )
}

export default MainPage