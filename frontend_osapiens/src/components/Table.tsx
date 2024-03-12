import React from 'react'
import { useTable } from 'react-table'

function ReactTable({ data, columns, onRowClick }) {
    const {
        getTableProps,
        getTableBodyProps,
        rows,
        prepareRow,
        headerGroups,
    } = useTable({
        columns,
        data,
    })

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => {
                            const { render, getHeaderProps } = column
                            return (
                                <th {...getHeaderProps()}>{render("Header")}</th>
                            )
                        })}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} >

                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()} onClick={(e) => onRowClick(e, row, cell)}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

ReactTable.defaultProps = {
    onRowClick: undefined
}
export default ReactTable;