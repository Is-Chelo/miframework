/* eslint-disable react/button-has-type */
import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const Add = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './add')
)
const List= React.lazy(() =>
  import(/* webpackChunkName: "second" */ './list')
)
const Edit = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './edit')
)

const Tareas = ({ match }) => {
  return (
    <>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Route
            path={`${match.url}`}
            render={props => <List {...props} />}
            exact
          />
          <Route
            path={`${match.url}/add`}
            render={props => <Add {...props} />}
            exact
          />
          <Route
            path={`${match.url}/edit/:id`}
            render={props => <Edit {...props} />}
            exact
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </>
  )
}
export default Tareas
