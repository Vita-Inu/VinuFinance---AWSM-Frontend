import {useTheme} from "styled-components";

import {Wrapper, Container, LinkWrapper, Link, Buttons, Title, Description} from "./components";
import {Button} from "@/components/button";

export function NotConnectedError() {
    const {colors} = useTheme()

    return (
        <Wrapper>
            <Container>
                <Title>Please, connect you wallet</Title>
                <Description>Please connect your wallet to see your loans, borrowings, and open positions</Description>
                <Buttons>
                    <Button background={colors.pink} text={colors.black}>Connect Wallet</Button>
                    <Button background={colors.white} text={colors.black}>Learn more</Button>
                </Buttons>
                <LinkWrapper>
                    <Link href={'#'}>What is wallet?</Link>
                </LinkWrapper>
            </Container>
        </Wrapper>
    )
}