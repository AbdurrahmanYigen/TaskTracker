import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from "./components/GlobalStyle";
import { Layout } from "./components/Layout";
import { theme } from "./theme";
import { DashboardPage } from "./pages/Dashboard/DashboardPage"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { TrackingPage } from "./pages/Trackings/TrackingsPage"

export const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Switch>
                    <Layout>
                        <Route exact path="/dashboard" component={DashboardPage} />
                        <Route exact path="/trackings/:taskid" component={TrackingPage}/>
                    </Layout>
                </Switch>
            </ThemeProvider>
        </BrowserRouter>
    );
};