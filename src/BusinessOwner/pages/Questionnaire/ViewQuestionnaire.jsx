import React, { useEffect, useState } from 'react'
import QuestionnaireTable from './QuestionnaireTable';
import { Title, Box } from '@mantine/core';
import axios from 'axios';


const ViewQuestionnaire = () => {

  return (
    <Box>
        <Title
          order={2}
          align="center"
          sx={{ fontWeight: 550 }}
        >
          View Questionnaire Details
        </Title>
        <QuestionnaireTable />
    </Box>
  )
}

export default ViewQuestionnaire