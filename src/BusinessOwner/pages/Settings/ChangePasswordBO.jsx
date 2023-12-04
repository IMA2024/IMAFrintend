import { useForm } from '@mantine/form';
import { Button, Container, createStyles, Paper, Textarea, Title, Divider, Box, TextInput, PasswordInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom'; 
import { changePassword } from '../../../api/profiling/changePassword';
import React, { useContext } from "react";
import { UserContext } from '../../../context/users/userContext';

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

export default function ChangePasswordBO() {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {  currentPassword: '', newPassword: '' , confirmPassword: ''},
    validateInputOnChange: true,
    validate: {
        currentPassword: (value) => (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value) ? null : 'Current Password Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character'),
        newPassword: (value) => (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value) ? null : 'New Password Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character'),
        confirmPassword: (value, { newPassword }) => { if (!value) return 'Please Confirm Your Password'; return value === newPassword ? null : 'Passwords Do Not Match';},
    },
  });

  const handleSubmit = async (values) => {
    const { currentPassword, newPassword } = values;
    try {
      const response = await changePassword( user?._id, currentPassword, newPassword );
      if (response.status === 201 || response.status === 200) {
        form.reset();
        notifications.show({ message: `Password Changed Successfully`, color: 'green' });
      }

    } catch (error) {
      notifications.show({ message: error?.response?.data?.message, color: 'red', });
    }
  };

  const handleCancel = () => {
    navigate('/BusinessPanelDashboard');
  };

  return (
    <Paper withBorder shadow="md" pt={10} pb={10} pl={35} pr={35} radius="md">
      <Title mb={10} order={2} align="center" sx={{ fontWeight: 550 }}>
        Change Password
      </Title>
      <Divider mb={30} />
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} >
      <Box >
      <PasswordInput
            withAsterisk
            size="sm"
            label="Current Password"
            placeholder="Enter Current Password"
            {...form.getInputProps('currentPassword')}
            maxLength={20} 
          />
        </Box>
        <Box className={classes.responsiveContainer}>
          <PasswordInput
            withAsterisk
            size="sm"
            className={classes.inputField}
            label="New Password"
            placeholder="Enter New Password"
            {...form.getInputProps('newPassword')}
            maxLength={20} 
          />
          <PasswordInput
            withAsterisk
            size="sm"
            className={classes.inputField}
            label="Confirm Password"
            placeholder="Confirm Your Password"
            {...form.getInputProps('confirmPassword')}
            maxLength={20} 
          />
        </Box>
        <Container mt="sm" style={{ display: 'flex', justifyContent: 'right', gap: '20px' }}>
          <Button mt="sm" size="sm" color="red.8" onClick={() => handleCancel()}>
            Cancel
          </Button>
          <Button type="submit" mt="sm" size="sm" color="green.9">
            Submit
          </Button>
        </Container>
      </form>
    </Paper>
  );
}
