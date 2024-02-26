import { Card, Grid } from '@mui/material'
import MDBox from 'components/MDBox'
import Footer from 'examples/Footer'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React from 'react'

const Exercises = () => {
    return (
        <DashboardLayout>
            <DashboardNavbar />

            <MDBox py={3}>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <Card style={{ height: 400, width: '100%' }}></Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card style={{ height: 400, width: '100%' }}></Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    )
}

export default Exercises