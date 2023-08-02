import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, Box , createStyles, Paper, Textarea } from '@mantine/core';
import Datepicker from '../components/Date';

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

export default function AuthenticationForm() {
  const {classes} = useStyles()
  const form = useForm({
    initialValues: { title: '', businessName: '', businessDetails: '', date: '', amount: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      title: (value) => (/^[a-zA-Z]{3,20}$/.test(value) ? null : 'Title should contain atleast 3 alphabets'),
      businessName: (value) => (/^[a-zA-Z]{3,20}$/.test(value) ? null : 'Business Name should contain 3 alphabets'),
      businessDetails: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Business Details must not be empty'),
      date: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Date must not be empty '),
      amount: (value) => (/^(?!\s*$).+/.test(value) ? null : 'Business Amount must not be empty '),
    },
  });

  return (
    <Paper withBorder shadow="md" p={30}  radius="md">
      <form onSubmit={form.onSubmit(console.log)} >
        <Box className={classes.responsiveContainer}>
        <TextInput size='md' className={classes.inputField} label="Title" placeholder="Title" {...form.getInputProps('title')} />
        <TextInput size='md' className={classes.inputField} label="Business Name" placeholder="Business Name" {...form.getInputProps('businessName')} />
        </Box>
        <Textarea size='md' mt="md" label="Business Details" placeholder="Details" {...form.getInputProps('businessDetails')} />
        <Box className={classes.responsiveContainer} mt="md" >
        <Datepicker  label="Business Name" placeholder="Business Name" className={classes.inputField}  {...form.getInputProps('date')} />
        <NumberInput size='md' label="Business Amount" placeholder="Business Amount"  className={classes.inputField} {...form.getInputProps('amount')}   />
         </Box>
        <Button type="submit" mt="md">
          Submit
        </Button>
      </form>
    </Paper>
  );
}