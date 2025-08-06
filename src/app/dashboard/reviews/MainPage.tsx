"use client"
import React, {useState } from 'react'
import { IReview } from 'types/general';
import dynamic from 'next/dynamic';
import DefaultLayout from 'components/Dashboard/DefaultLayout';
const AddReview = dynamic(() => import("./AddReview"))
const ViewReviews = dynamic(() => import("./ViewReviews"))

function MainPage({ reviews }: { reviews: IReview[] }) {
    const [editReview, setEditsetReview] = useState<IReview | undefined>();
    const [selecteMenu, setselecteMenu] = useState<string>("All Reviews");



    return (

        <DefaultLayout>
            {selecteMenu == "All Reviews" ?

                <ViewReviews setEditsetReview={setEditsetReview} setselecteMenu={setselecteMenu} review={reviews} /> :
                <AddReview editReview={editReview} setEditsetReview={setEditsetReview} setselecteMenu={setselecteMenu} />}

        </DefaultLayout>

    )
}

export default MainPage