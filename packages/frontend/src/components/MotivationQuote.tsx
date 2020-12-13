import { useEffect, useState } from "react";
import styled from "styled-components"
import { CreateButton } from "../pages/Dashboard/components/TaskItem";

interface Quote {
    text: string;
    author: string;
}

export const MotivationQuote = () => {
    const [allQuotes, setAllQuotes] = useState<Quote[]>([]);
    const [quote, setQuote] = useState<Quote>();

    const fetchQuotes = async function () {
        const tasksRequest = await fetch("/api/motivation", {
            headers: { 'content-type': "application/json" },
        });
        if (tasksRequest.status === 200) {
            const taskJSON = await tasksRequest.json();
            setAllQuotes(taskJSON.data)
            selectRandomQuote(taskJSON.data);
        }
    };
    useEffect(() => {
        fetchQuotes();
    }, [])

    const selectRandomQuote = (quotes: Quote[]) => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }


    return (
        <QuoteField>
            <div>"{quote?.text}"</div>
            <div>- {quote?.author}</div>
            <CreateButton onClick={() => selectRandomQuote(allQuotes)}>new Quote</CreateButton>
        </QuoteField>
    )
}

export const NewQuoteButton = styled.button`
    background-color: ${props => props.theme.colors.buttonColor};
    color: white;
    padding: 5px;
    &:hover{
        background-color: ${props => props.theme.colors.hoverButtonColor};
    }
`;

const QuoteField = styled.div`
    border-radius: 2%;
    background-color: ${props => props.theme.colors.listBackgroundColor};
    padding: 15px;
    margin: 8px;
    
`;