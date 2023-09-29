import React, { useEffect, useState } from 'react'
//import TableForBusinessOnwers from './BusinessOwnerTable';
import QuestionnaireTableMA from './QuestionnaireTableMA';
import { Title, Box } from '@mantine/core';



const ViewQuestionnaireMA = () => {

  return (
    <Box>
        <Title
          order={2}
          align="center"
          sx={{ fontWeight: 550 }}
        >
          View Business Questionnaire
        </Title>
        <QuestionnaireTableMA />
    </Box>
  )
}

export default ViewQuestionnaireMA