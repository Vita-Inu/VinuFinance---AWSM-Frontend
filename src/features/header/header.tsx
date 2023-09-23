import Link from "next/link";
import {useTheme} from "styled-components";

import {Logo} from "@/components/logo";
import {Button} from "@/components/button";
import {Container} from "@/components/container";
import {ROUTE} from "@/utils";

import {Row, Wrapper, Menu, MenuItem} from "./components"

export function Header() {
    const {colors} = useTheme()

    return (
        <Wrapper>
            <Container>
                <Row>
                    <Link href={ROUTE.HOME}>
                        <Logo/>
                    </Link>
                    <Menu>
                        <Link href={'#'}>
                            <MenuItem $active={true}>Borrow</MenuItem>
                        </Link>
                        <Link href={'#'}>
                            <MenuItem $active={false}>Manage Loans</MenuItem>
                        </Link>
                        <Link href={'#'}>
                            <MenuItem $active={false}>LP</MenuItem>
                        </Link>
                    </Menu>
                    <Button background={colors.pink} text={colors.black}>Connect Wallet</Button>
                </Row>
            </Container>
        </Wrapper>
    )
}