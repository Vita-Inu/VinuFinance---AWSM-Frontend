import NextLink from "next/link"

import styled from "styled-components";

export const Wrapper = styled.div`
  padding-top: 0.6rem;
`

export const Container = styled.div`
  width: 100%;
  max-width: 72.3rem;
  margin: 0 auto;
`

export const Title = styled.h1`
  color: ${props => props.theme.colors.pink};
  font-size: 6.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: -0.192rem;
`

export const Description = styled.p`
  color: ${props => props.theme.colors.pink};
  text-align: center;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 180%;
  max-width: 50rem;
  margin: 4rem auto 0;
`

export const Buttons = styled.div`
  margin-top: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .8rem;
`

export const LinkWrapper = styled.div`
  margin-top: 4rem;
  text-align: center;
`

export const Link = styled.span`
  color: ${props => props.theme.colors.grey};
  text-align: center;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: 180%;
  border-bottom: .1rem solid ${props => props.theme.colors.grey};
`