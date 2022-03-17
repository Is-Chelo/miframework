import { Colxx, Separator } from 'components/common/CustomBootstrap'
import IntlMessages from 'helpers/IntlMessages'
import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from 'containers/navs/Breadcrumb'
import Peticion from 'helpers/Peticiones'
import { Button, Row } from 'reactstrap'
import TableCustom from 'components/TableCustom'
import Option from 'components/Option'

const List = ({ match }) => {
  const [change, setChange] = React.useState(false)
  const data = new Peticion(`/asdasds/asdasd`).getData(change)
  console.log(data)
  if (data.message === 'No tienes autorización') {
    window.location = 'http://localhost:3000/user/login'
  }

  const cols = React.useMemo(
    () => [
      {
        Header: 'Active',
        cellClass: 'text-muted w-10',
        accessor: 'active',
        Cell: function state({ row }) {
          return (
            <>
              {row.original.active ? (
                <span className="badge badge-success">Active</span>
              ) : (
                <span className="badge badge-danger">Inactive</span>
              )}
            </>
          )
        }
      },
      {
              Header: 'Asd',
              cellClass: 'list-item-heading w-40',
              accessor: 'asd'
            },,{
              Header: 'Asd',
              cellClass: 'list-item-heading w-40',
              accessor: 'asd'
            },,{
              Header: 'Asd',
              cellClass: 'list-item-heading w-40',
              accessor: 'asd'
            },
      
      {
        Header: 'Actions',
        cellClass: 'text-muted w-20',
        Cell: function option(props) {
          return (
            <>
              <Option
                row={props.row}
                match={match}
                setChange={setChange}
                change={change}
                url={{ path: '/config1/', modulo: 'tariffs' }}
              />
            </>
          )
        }
      }
    ],
    [match, change]
  )
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.tariffs" match={match} />
          <Link to={`${match.url}/add`}>
            <Button color="primary" className="mb-2 float-right">
              <IntlMessages id="form.add" />
            </Button>{' '}
          </Link>

          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12">
          <TableCustom
            columns={cols}
            data={data}
            titlePrint="Informe"
            excluir={[]}
          />
        </Colxx>
      </Row>
    </>
  )
}

export default List
