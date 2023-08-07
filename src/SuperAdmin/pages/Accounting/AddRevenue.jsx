import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, Box , createStyles, Paper, Textarea, Title, Divider, Select } from '@mantine/core';
import Datepicker from '../../../components/Date';

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

export default function AddRevenue() {
  const {classes} = useStyles()
  const form = useForm({
    initialValues: { title: '', businessName: '', businessDetails: '', date: '', amount: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      title: (value) => (/^[a-zA-Z\s]{3,20}$/.test(value) ? null : 'Title Should Contain Atleast 3 Alphabets'),
      businessName: (value) => (/^[a-zA-Z]{3,40}$/.test(value) ? null : 'Business Name Should Contain 3 Alphabets'),
      businessDetails: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Business Details Must Not Be Empty'),
      date: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Date Must Not Be Empty '),
      amount: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Business Amount Must Not Be Empty '),
    },
  });

  return (
    <Paper withBorder shadow="md" p={35}  radius="md">
       <Title
          mb={20}
          align="center"
          sx={{ fontWeight: 650 }}
        >
          Add Revenue Details
        </Title>
        <Divider mb={30} />
      <form onSubmit={form.onSubmit(console.log)} >
        <Box className={classes.responsiveContainer}>
        <TextInput withAsterisk size='md' className={classes.inputField} label="Title" placeholder="Enter Title: Car Business" {...form.getInputProps('title')} />
        <Select withAsterisk size='md' className={classes.inputField} label="Business Name" placeholder="Select Business Name" {...form.getInputProps('businessName')}
        data={[
            { value: 'react', label: 'React' },
            { value: 'ang', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' },
            { value: 'vue', label: 'Vue' },
          ]}
         />
        </Box>
        <Textarea withAsterisk size='md' mt="md" label="Business Details" placeholder="Enter Business Details: This Business Is Related To Cars." {...form.getInputProps('businessDetails')} />
        <Box className={classes.responsiveContainer} mt="md" >
        <Datepicker withAsterisk label="Date" placeholder="Select Date" className={classes.inputField}  {...form.getInputProps('date')} />
        <NumberInput withAsterisk size='md' label="Business Amount" placeholder="Enter Business Amount: 121"  className={classes.inputField} {...form.getInputProps('amount')}   />
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