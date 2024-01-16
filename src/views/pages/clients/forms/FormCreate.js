// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import { createCollector } from 'services/collector.services';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FormCreate = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const handleSendCreateCollector = async (values) => {
    console.log('handleSendCreateCollecto' + JSON.stringify(values));
    const { username, fname, password } = values;
    createCollector({ username, name: fname, password })
      .then((result) => {
        alert('create ' + result);
        console.log('creado ', result);
      })
      .catch((error) => {
        console.error('Error en el inicio de sesión: ', error);
      });
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Estas a punto de crear un nuevo cliente</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          name: '',
          document: '',
          address: '',
          occupation: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string('nombre valido').max(255).required('nombre'),
          document: Yup.string('Ponga un Documento Valido!!').max(255).required('Documento es requerido'),
          address: Yup.string('Ponga una direccion!!').max(255).required('Direccion es requerida!'),
          occupation: Yup.string('Ponga una ocupacion!!').max(255).required('Ocupacion es requerida!')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          handleSendCreateCollector(values);
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Nombre"
                  margin="normal"
                  value={values.name}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  sx={{ ...theme.typography.customInput }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Documento"
                  margin="normal"
                  value={values.document}
                  name="document"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  sx={{ ...theme.typography.customInput }}
                />
              </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Direccion</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="text"
                value={values.address}
                name="address"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.username && errors.username && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Ocupacion</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="text"
                value={values.occupation}
                name="occupation"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.username && errors.username && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Crear!!
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FormCreate;
