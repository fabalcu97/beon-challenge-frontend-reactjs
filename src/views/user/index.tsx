import { Button, Grid, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router';
import { User as UserInterface } from '../../interfaces';
import { useStyles } from './styles';

const fetchUrl = `https://fakerapi.it/api/v1/custom?_quantity=1&name=name&company_name=company_name&email=email&phone=phone&id=uuid`;
const getUser = async () => {
  const response = await fetch(fetchUrl);
  if (!response.ok) {
    throw new Error('There was an error, please try again.');
  }
  return response.json();
};

const validationSchema = new Yup.ObjectSchema({
  email: Yup.string().required().email(),
  phone: Yup.string().required(),
  name: Yup.string().required(),
  company_name: Yup.string().required(),
});

export function User() {
  const [user, setUser] = useState<UserInterface>();
  const { id } = useParams<{ id: string }>();
  const { goBack } = useHistory();
  const { data, isLoading } = useQuery('getUser', getUser);
  const classes = useStyles();

  useEffect(() => {
    if (data) {
      setUser(data.data[0]);
    }
  }, [data]);

  if (isLoading) {
    return <h4>Loading...</h4>;
  }

  return user ? (
    <div className={classes.root}>
      <Formik
        initialValues={user}
        validationSchema={validationSchema}
        validateOnChange
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            goBack();
          }, 400);
        }}>
        {(formik) => (
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id='name'
                name='name'
                label='Name'
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id='email'
                name='email'
                label='Email'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id='phone'
                name='phone'
                label='Phone Number'
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id='company_name'
                name='company_name'
                label='Company Name'
                value={formik.values.company_name}
                onChange={formik.handleChange}
                error={
                  formik.touched.company_name &&
                  Boolean(formik.errors.company_name)
                }
                helperText={
                  formik.touched.company_name && formik.errors.company_name
                }
              />
            </Grid>
            <Grid container item xs={11} justify='flex-end'>
              <Button
                type='submit'
                color='secondary'
                variant='contained'
                className={classes.submitButton}
                onClick={goBack}>
                Cancel
              </Button>
              <Button
                type='submit'
                color='primary'
                variant='contained'
                className={classes.submitButton}
                disabled={formik.isSubmitting}
                onClick={formik.submitForm}>
                Submit
              </Button>
            </Grid>
          </Grid>
        )}
      </Formik>
    </div>
  ) : (
    <></>
  );
}
