import React from 'react'
// import { Planets } from './Planets'
export interface TableProps {
    data: [],
    columns: [],
    onRowClick: (e: React.MouseEvent, row: [], cell: [])=> void
}