import React, { useContext, useState } from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Box,
  createStyles,
  Paper,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { UserContext } from "../../../context/users/userContext";

const useStyles = createStyles((theme) => ({
  responsiveContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },
  inputField: {
    width: "50%",
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

export default function ConfigureCrawler() {
  const [countries, setCountries] = useState([]);
  const { user } = useContext(UserContext);
  const { classes } = useStyles();

  const form = useForm({
    initialValues: { url: "", callButtonTag: "", tableTag: "" },
    validateInputOnChange: true,
    validate: {
      url: "Please Enter Url",
      callButtonTag: "Please Enter Call Button Tag By Classname",
      tableTag: "Please Enter Table Tag By Classname",
    },
  });

  const handleSubmit = async (values) => {
    const { url, callButtonTag, tableTag } = values;

    try {
      const response = await fetch("http://127.0.0.1:5000/scrape_zameen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, callButtonTag, tableTag }),
      });

      if (response.ok) {
        form.reset();
        notifications.show({
          message: "Crawling initiated successfully",
          color: "green",
        });
      } else {
        const errorData = await response.json();
        notifications.show({
          message: errorData.error,
          color: "red",
        });
      }
    } catch (error) {
      notifications.show({
        message: "An error occurred while sending the request",
        color: "red",
      });
    }
  };

  return (
    <Paper withBorder shadow="md" p={35} radius="md">
      <Title align="center" order={2} sx={{ fontWeight: 550 }} mb={5}>
        Configure Crawler
      </Title>

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Box>
          <TextInput
            withAsterisk
            size="sm"
            label="Url"
            placeholder="Enter Url: mantine.dev"
            {...form.getInputProps("url")}
          />
        </Box>
        <Box mt="sm" className={classes.responsiveContainer}>
          <TextInput
            withAsterisk
            size="sm"
            className={classes.inputField}
            label="Call Button Tag"
            placeholder="Enter Call Button Tag Classname: responsiveInput"
            {...form.getInputProps("callButtonTag")}
          />
          <TextInput
            withAsterisk
            size="sm"
            className={classes.inputField}
            label="Table Tag"
            placeholder="Enter Table Tag"
            {...form.getInputProps("tableTag")}
          />
        </Box>
        <Box style={{ display: "flex", justifyContent: "right", gap: "20px" }}>
          <Button mt="lg" size="sm" color="red.8">
            Cancel
          </Button>
          <Button type="submit" mt="lg" size="sm" color="green.9">
            Run Crawler
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
