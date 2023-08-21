import React, { useEffect, useState } from 'react'
import QuestionnaireTable from './QuestionnaireTable';
import { Title, Box } from '@mantine/core';
import axios from 'axios';


const ViewQuestionnaire = () => {

  return (
    <Box>
        <Title
          mb={20}
          align="center"
          sx={{ fontWeight: 650 }}
        >
          View Questionnaire Details
        </Title>
        <QuestionnaireTable />
    </Box>
  )
}

export default ViewQuestionnaire