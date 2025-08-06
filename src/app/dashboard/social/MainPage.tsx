"use client"
import React, {useState } from 'react'
import { ISOCIAL_LINKS } from 'types/general';
import dynamic from 'next/dynamic';
import DefaultLayout from 'components/Dashboard/DefaultLayout';
const Addsocial = dynamic(() => import("./Addsocial"))
const ViewSocial = dynamic(() => import("./ViewSocial"))

function MainPage({ reviews }: { reviews: ISOCIAL_LINKS[] }) {
    const [editReview, setEditsetReview] = useState<ISOCIAL_LINKS | undefined>();
    const [selecteMenu, setselecteMenu] = useState<string>("All Socials");
    return (

        <DefaultLayout>
            {selecteMenu == "All Socials" ?

                <ViewSocial setEditsetReview={setEditsetReview} setselecteMenu={setselecteMenu} review={reviews} /> :
                <Addsocial editReview={editReview} setEditsetReview={setEditsetReview} setselecteMenu={setselecteMenu} />}

        </DefaultLayout>

    )
}

export default MainPage