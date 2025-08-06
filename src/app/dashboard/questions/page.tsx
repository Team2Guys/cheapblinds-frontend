import React from 'react'
import { fetchProductQuestions } from 'config/generals'
import QuestionMain from './QuestionMain'

async function page() {
        const questions  = await fetchProductQuestions()
     console.log(questions,"questionsquestions")
    return (
        <QuestionMain questions={questions}/>
    )
}

export default page


