import { Blur, Box, Description, Icon, Texts, Title, Wrapper } from './styled';

import { NOTIFICATION_TYPE } from '../../types';
import { useEffect, useState } from 'react';

type Props = {
  id: string
  type: NOTIFICATION_TYPE;
  title: string;
  description?: string;
  onExpire: VoidFunction
};

type Colors = {
  icon: string,
  blurMain: string,
  blurSecond: string
}

const TypeColorMap = new Map<NOTIFICATION_TYPE, Colors>([
  [NOTIFICATION_TYPE.SUCCESS, {icon: '#00DF80', blurMain: '#00ED51', blurSecond: '#00ED7B'}],
  [NOTIFICATION_TYPE.WARNING, {icon: '#FFD21E', blurMain: '#FFD426', blurSecond: '#FFD426'}],
  [NOTIFICATION_TYPE.ERROR, {icon: '#F04248', blurMain: '#F04248', blurSecond: '#F04248'}]
])

const NOTIFICATION_EXPIRATION = 5000;

export function Notification({title, description, type, id, onExpire}: Props) {
  const [isMounted, setIsMounted] = useState(false)

  const colors = TypeColorMap.get(type)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true)
    }, 50)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onExpire()
    }, NOTIFICATION_EXPIRATION)

    return () => {
      clearTimeout(timeout)
    }
  }, [onExpire])

  return (
    <Wrapper $visible={isMounted}>
      <Box>
        <Icon>
          {colors && <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="16" fill="#303746"/>
            <mask id={`icon-${id}`} style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
              <rect x="4" y="4" width="24" height="24" fill="#D9D9D9"/>
            </mask>
            <g mask={`url(#icon-${id}`}>
              <path d="M14.6 20.6L21.65 13.55L20.25 12.15L14.6 17.8L11.75 14.95L10.35 16.35L14.6 20.6ZM16 26C14.6167 26 13.3167 25.7373 12.1 25.212C10.8833 24.6873 9.825 23.975 8.925 23.075C8.025 22.175 7.31267 21.1167 6.788 19.9C6.26267 18.6833 6 17.3833 6 16C6 14.6167 6.26267 13.3167 6.788 12.1C7.31267 10.8833 8.025 9.825 8.925 8.925C9.825 8.025 10.8833 7.31233 12.1 6.787C13.3167 6.26233 14.6167 6 16 6C17.3833 6 18.6833 6.26233 19.9 6.787C21.1167 7.31233 22.175 8.025 23.075 8.925C23.975 9.825 24.6873 10.8833 25.212 12.1C25.7373 13.3167 26 14.6167 26 16C26 17.3833 25.7373 18.6833 25.212 19.9C24.6873 21.1167 23.975 22.175 23.075 23.075C22.175 23.975 21.1167 24.6873 19.9 25.212C18.6833 25.7373 17.3833 26 16 26Z" fill={colors.icon}/>
            </g>
          </svg>}
        </Icon>
        <Texts>
          <Title>{title}</Title>
          {description && <Description>{description}</Description>}
        </Texts>
      </Box>
      <Blur>
        {colors && <svg width="138" height="104" viewBox="0 0 138 104" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle id="Ellipse 48" cx="32" cy="41" r="106" fill={`url(#blur-${id})`} fillOpacity="0.12"/>
          <defs>
            <radialGradient id={`blur-${id}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 41) rotate(90) scale(106)">
              <stop stopColor={colors.blurMain}/>
              <stop offset="1" stopColor={colors.blurSecond} stopOpacity="0"/>
            </radialGradient>
          </defs>
        </svg>}
      </Blur>
    </Wrapper>
  )
}