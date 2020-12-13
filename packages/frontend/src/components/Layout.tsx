import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { MotivationQuote } from "./MotivationQuote"

const headerHeight = "85px";
const footerHeight = "50px";

const Header = styled.header`
        height: ${headerHeight};
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 25px;
    `;

const MaxWidthCSS = css`
        max-width: 860px;
        margin: auto;
    `

const Main = styled.main`
        min-height: calc(85vh - ${headerHeight} - ${footerHeight});
        padding: 0 25px;
        ${MaxWidthCSS}
    `;

const Footer = styled.footer`
        height: ${footerHeight};
        padding: 0 25px;
        ${MaxWidthCSS}
    `;

const LinkToDashboard = styled(Link)`
    text-decoration: none;
    color: white;

`;

export const Layout: React.FC = ({ children }) => {
    return (
        <>
            <Header>
                <div css={`
                    font-size: 25px;
                    letter-spacing: 2.3px;
                    flex: 1;
                `}>
                    <LinkToDashboard to={"../dashboard"}>
                        <span css={`
                        text-decoration: underline overline;
                        background-color: rgb(70, 70, 70);
                        padding: 10px;
                        border-radius: 8%;
                    `}>
                            TT
                    </span>
                    </LinkToDashboard>
                </div>
                <LinkToDashboard to={"../dashboard"}>Home</LinkToDashboard>
            </Header>
            <Main>{children}</Main>
            <Footer><MotivationQuote /></Footer>
        </>
    );
};