import { isNotEmpty , useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, Box , createStyles, Paper, Textarea, Title, Divider, Select } from '@mantine/core';
import Datepicker from '../../../components/Date';
import { useEffect , useState } from 'react';
import { addExpense } from '../../../api/admin/accounting';
import { notifications } from '@mantine/notifications';

const useStyles = createStyles((theme) => ({

  responsiveContainer: {
   width: '100%',
   display: 'flex',
   flexDirection: 'row',
   gap: '16px',
   //backgroundColor:'pink',
 
   [theme.fn.smallerThan('sm')]: {
     flexDirection: 'column'
   },
 
  },
 
  inputField: {
   width: '50%',
   [theme.fn.smallerThan('sm')]: {
     width: '100%'
   },
  }
   
 }));

export default function ConfigureAgents() {

  const [countries, setCountries] = useState([]);
  const {classes} = useStyles();

  const form = useForm({
    initialValues: { businessName: '', agentName: '', agentVoice: '' },
    validateInputOnChange: true,
    // functions will be used to validate values at corresponding key
    validate: {
      businessName: isNotEmpty('Please Select Business Name'),
      agentName: isNotEmpty('Please Select Agent Name'),
      agentVoice: isNotEmpty('Please Select Agent Voice'),
    },
  });

  useEffect(() =>{
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/admin/businessesList');
      const newData =  await response.json();
      console.log(newData);
      setCountries(newData);
    };
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    const { title , business , description , date , amount } = values;

    try {
      const response = await addExpense( title , business , description , date , amount );
      if (response.status === 201) {
        form.reset();
        notifications.show({ message: `Expense Added Successfully`, color: 'green' });
      }

    } catch (error) {
      notifications.show({ message: error.response.data.message, color: 'red', });
    }
  };

  return (
    <Paper withBorder shadow="md" p={35}  radius="md">
       <Title
          mb={20}
          align="center"
          //order={2}
          sx={{ fontWeight: 650 }}
        >
          Configure System Agents
        </Title>
        <Divider mb={30} />
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
      <Box >
        <Select withAsterisk size='md' label="Business Name" placeholder="Select Business Name" {...form.getInputProps('businessName')}
        data={[
            { value: 'react', label: 'React' },
            { value: 'ng', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' },
            { value: 'vue', label: 'Vue' },
          ]}
         />
        </Box>
      <Box mt="md"  className={classes.responsiveContainer}>
        <Select withAsterisk size='md' className={classes.inputField} label="Agent Name" placeholder="Select Agent Name" {...form.getInputProps('agentName')}
        data={[
            { value: 'react', label: 'React' },
            { value: 'ng', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' },
            { value: 'vue', label: 'Vue' },
          ]}
         />
        <Select withAsterisk size='md' className={classes.inputField} label="Agent Voice" placeholder="Select Agent Voice" {...form.getInputProps('agentVoice')}
            data={[
                { value: 'react', label: 'React' },
                { value: 'ng', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'vue', label: 'Vue' },
              ]}
         />
        </Box>
         <Box style={{display:'flex', justifyContent:'right', gap:'20px'}}>
         <Button  mt="lg"  size='md' color='red.8' >
          Cancel
        </Button>
        <Button type="submit" mt="lg"  size='md' color='green.9' >
          Submit
        </Button>
        </Box>
      </form>
    </Paper>
  );
}