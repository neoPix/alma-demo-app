import React from 'react';
import { useSelector } from "react-redux";
import Economics from "../store/interfaces/Economics";
import Store from "../store/interfaces/Store";
import BarIcon from './Icons/Bar';
import FooIcon from './Icons/Foo';
import FooBarIcon from './Icons/FooBar';
import styled from 'styled-components';
import RobotIcon from './Icons/Robot';
import { copper } from './colors';

const EconomicsDiv = styled.div`
    font-size: 1.5rem;
    color: white;
    position: absolute;
    top: 0;
    right: 6rem;
    display: flex;
    column-gap: 1rem;
    background: ${copper};
    border-radius: 0 0 .5rem .5rem;
    padding: .5rem 1rem;
`;

const EconomicsMoney = styled.span``;


export default function EconomicsComponent() {
    const economics = useSelector<Store, Economics>(store => store.economics);
    const robotsCount = useSelector<Store, number>(store => store.robots.length);
    return (<EconomicsDiv>
        <EconomicsMoney title="bar"><BarIcon />{ economics.bar }</EconomicsMoney>
        <EconomicsMoney title="foo"><FooIcon />{ economics.foo }</EconomicsMoney>
        <EconomicsMoney title="foobar"><FooBarIcon /> { economics.foobar }</EconomicsMoney>
        <EconomicsMoney title="robots"><RobotIcon />{ robotsCount }</EconomicsMoney>
    </EconomicsDiv>);
}