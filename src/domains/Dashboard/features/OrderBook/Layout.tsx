import { Tooltip } from 'app/components'
import type { OrderBookData, OrderBookMode } from 'app/domains/Dashboard'
import { Menu } from 'app/domains/Dashboard/features/OrderBook/components/Menu'
import { BuyMode } from 'app/icons/BuyMode'
import { DefaultMode } from 'app/icons/DefaultMode'
import { SellMode } from 'app/icons/SellMode'
import { notReachable } from 'app/utils'
import { useCallback, useState } from 'react'
import { BuyModeTable } from './components/BuyModeTable'
import { BuySellRatio } from './components/BuySellRatio'
import { DefaultModeTable } from './components/DefaultModeTable'
import { SellModeTable } from './components/SellModeTable'

type Props = {
  data: OrderBookData
  base: string
  quote: string
}

export function Layout({ data, base, quote }: Props) {
  const [mode, setMode] = useState<OrderBookMode>('default')
  const [rounding, setRounding] = useState(true)
  const [showRatio, setShowRatio] = useState(true)
  const [depthMode, setDepthMode] = useState<'amount' | 'cumulative'>('cumulative')

  const handleMenuMsg = useCallback((msg: Parameters<typeof Menu>[0]['onMsg'] extends (msg: infer M) => void ? M : never) => {
    switch (msg.type) {
      case 'rounding_changed':
        setRounding(msg.value)
        break
      case 'show_ratio_changed':
        setShowRatio(msg.value)
        break
      case 'depth_mode_changed':
        setDepthMode(msg.value)
        break
      default:
        notReachable(msg)
    }
  }, [])

  const handleDefaultModeClick = useCallback(() => setMode('default'), [])
  const handleBuyModeClick = useCallback(() => setMode('buy'), [])
  const handleSellModeClick = useCallback(() => setMode('sell'), [])

  return (
    <div className="bg-[#181A20] rounded-lg p-4">
      <div className="flex justify-between">
        <p className="text-sm font-semibold">Order Book</p>
        <Menu
          rounding={rounding}
          showRatio={showRatio}
          depthMode={depthMode}
          onMsg={handleMenuMsg}
        />
      </div>

      <hr className="my-2 -mx-4 h-px border-t-0 bg-neutral-100 dark:bg-white/10" />
      <div className="flex gap-2 mb-4">
        <Tooltip label="Order book">
          <DefaultMode
            className="cursor-pointer w-4 h-4"
            onClick={handleDefaultModeClick}
          />
        </Tooltip>

        <Tooltip label="Buy mode">
          <BuyMode
            className="cursor-pointer w-4 h-4"
            onClick={handleBuyModeClick}
          />
        </Tooltip>
        <Tooltip label="Sell mode">
          <SellMode
            className="cursor-pointer w-4 h-4"
            onClick={handleSellModeClick}
          />
        </Tooltip>
      </div>

      {(() => {
        switch (mode) {
          case 'default':
            return (
              <DefaultModeTable
                data={data}
                base={base}
                quote={quote}
                rounding={rounding}
                depthMode={depthMode}
              />
            )

          case 'buy':
            return (
              <BuyModeTable
                data={data}
                base={base}
                quote={quote}
                rounding={rounding}
                depthMode={depthMode}
              />
            )

          case 'sell':
            return (
              <SellModeTable
                data={data}
                base={base}
                quote={quote}
                rounding={rounding}
                depthMode={depthMode}
              />
            )

          default:
            return notReachable(mode)
        }
      })()}

      {showRatio && <BuySellRatio data={data} />}
    </div>
  )
}
