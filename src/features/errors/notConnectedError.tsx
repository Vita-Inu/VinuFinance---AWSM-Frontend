import {useState} from "react";
import {useTheme} from "styled-components";

import {Wrapper, Container, LinkWrapper, Link, Buttons, Title, Description, Modal} from "./components";
import {Button} from "@/components/button";


export function NotConnectedError() {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    const hideModal = () => setIsModalVisible(false)
    const showModal = () => setIsModalVisible(true)

    const {colors} = useTheme()

    return (
        <>
            <Wrapper>
                <Container>
                    <Title>Please, connect you wallet</Title>
                    <Description>Please connect your wallet to see your loans, borrowings, and open positions</Description>
                    <Buttons>
                        <Button background={colors.pink} text={colors.black}>Connect Wallet</Button>
                        <Button background={colors.white} text={colors.black}>Learn more</Button>
                    </Buttons>
                    <LinkWrapper>
                        <Link onClick={showModal} role={'button'}>What is wallet?</Link>
                    </LinkWrapper>
                </Container>
            </Wrapper>
            {isModalVisible && <Modal onClose={hideModal}/>}
        </>
    )
}