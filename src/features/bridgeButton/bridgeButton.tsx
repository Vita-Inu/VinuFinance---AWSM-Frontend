import { Button, BUTTON_PRESET } from '@/components/buttons';

export function BridgeButton() {
  return (
    <a href={'https://bridge.wanchain.org/#/?asset=VC&from=VinuChain'} target={'_blank'}>
      <Button preset={BUTTON_PRESET.WHITE}>
        Bridge
      </Button>
    </a>
  )
}