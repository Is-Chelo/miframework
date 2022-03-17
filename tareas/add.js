import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle
} from 'reactstrap'
import IntlMessages from 'helpers/IntlMessages'
import { Colxx, Separator } from 'components/common/CustomBootstrap'
import { useHistory } from 'react-router-dom'
import { FormikSwitch } from 'containers/form-validations/FormikFields'
import Breadcrumb from 'containers/navs/Breadcrumb'
import Peticion from 'helpers/Peticiones'

const SignupSchema = Yup.object().shape({
  asd: Yup.string().required('asd is required!'),asd: Yup.string().required('asd is required!')
})

const Add = ({ match }) => {
  const history = useHistory()
  const onSubmit = values => {
    new Peticion(`/asdasds/asdasd`).createItem(values)
    // console.log(peticion)
    setTimeout(() => {
      history.goBack()
    }, 1000)
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.formspayments" match={match} />
          {/* <Link to={previousUrl}> */}
          <Button
            color="primary"
            className="mb-2 float-right"
            onClick={() => history.goBack()}
          >
            <IntlMessages id="form.cancel" />
          </Button>{' '}
          {/* </Link> */}
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4 justify-content-center">
        <Colxx xxs="6 align-items-center">
          <Card>
            <CardBody>
              <Formik
                initialValues={{
                  asd: '',asd: '',asd: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={onSubmit}
              >
                {({
                  setFieldValue,
                  setFieldTouched,
                  values,
                  errors,
                  touched
                }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <Row>
                      <Colxx xxs="12">
                        <CardTitle className="mb-2">
                          <IntlMessages id="form.addFormspayments" />
                          <FormGroup className="form-group float-right">
                            <FormikSwitch
                              id="tooltip_add_role"
                              textTooltip={
                                values.active ? 'Active' : 'Inactive'
                              }
                              name="active"
                              className="custom-switch custom-switch-primary"
                              value={values.active}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />
                          </FormGroup>

                          <Separator className="mt-3 mb-5" />
                        </CardTitle>
                      </Colxx>
                    </Row>

                    <FormGroup className="form-group has-float-label">
            <Label>
              <IntlMessages id="form.asd" />
            </Label>
            <Field className="form-control" name="asd" />
            {errors.asd && touched.asd ? (
              <div className="invalid-feedback d-block">
                {errors.asd}
              </div>
            ) : null}
          </FormGroup><FormGroup className="form-group has-float-label">
            <Label>
              <IntlMessages id="form.asd" />
            </Label>
            <Field className="form-control" name="asd" />
            {errors.asd && touched.asd ? (
              <div className="invalid-feedback d-block">
                {errors.asd}
              </div>
            ) : null}
          </FormGroup><FormGroup className="form-group has-float-label">
            <Label>
              <IntlMessages id="form.asd" />
            </Label>
            <Field className="form-control" name="asd" />
            {errors.asd && touched.asd ? (
              <div className="invalid-feedback d-block">
                {errors.asd}
              </div>
            ) : null}
          </FormGroup>

                    <Button color="primary" type="submit">
                      <IntlMessages id="form.add" />
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  )
}
export default Add
