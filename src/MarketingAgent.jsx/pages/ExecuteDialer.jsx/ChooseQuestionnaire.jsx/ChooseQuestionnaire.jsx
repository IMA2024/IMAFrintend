import React from 'react'
import QuestionnaireTab from './QuestionnaireTab'
import { Title } from '@mantine/core'

const ChooseQuestionnaire = ({nextStep, prevStep}) => {
  return (
    <div>
       <Title
          mb={10}
          order={2}
          align="center"
          sx={{ fontWeight: 550 }}
        >
          Step 2: Choose Questionnaire
        </Title>
      <QuestionnaireTab nextStep={nextStep} prevStep={prevStep} />
    </div>
  )
}

export default ChooseQuestionnaire