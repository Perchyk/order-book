export type MenuMsg =
  | { type: 'rounding_changed'; value: boolean }
  | { type: 'show_ratio_changed'; value: boolean }
  | { type: 'depth_mode_changed'; value: 'amount' | 'cumulative' }
  | { type: 'display_avg_sum_changed'; value: boolean }

type Props = {
  onMsg: (msg: MenuMsg) => void
  rounding: boolean
  showRatio: boolean
  depthMode: 'amount' | 'cumulative'
  displayAvgSum: boolean
}

export const Menu = ({
  onMsg,
  rounding,
  showRatio,
  depthMode,
  displayAvgSum,
}: Props) => {
  return (
    <nav className="relative inline-block text-left">
      <details className="group">
        <summary className="flex cursor-pointer items-center gap-2 rounded-lg text-2xl h-4 pb-4 text-icon-normal hover:text-gray-600 focus:outline-none">
          ...
        </summary>

        <div className="absolute right-0 z-20 mt-3 w-64 rounded-xl bg-[#202630] shadow-xl">
          <div className="p-4 text-sm text-slate-200 space-y-4">
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Order Book Display
              </h4>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={displayAvgSum}
                  onChange={(e) =>
                    onMsg({
                      type: 'display_avg_sum_changed',
                      value: e.target.checked,
                    })
                  }
                  className="checkbox"
                />
                <span>Display Avg.&Sum</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showRatio}
                  onChange={(e) =>
                    onMsg({
                      type: 'show_ratio_changed',
                      value: e.target.checked,
                    })
                  }
                  className="checkbox"
                />
                <span>Show Buy/Sell Ratio</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rounding}
                  onChange={(e) =>
                    onMsg({ type: 'rounding_changed', value: e.target.checked })
                  }
                  className="checkbox"
                />
                <span>Rounding</span>
              </label>
            </div>

            <div className="h-px bg-white/10" />

            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Book Depth Visualization
              </h4>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="depth"
                  checked={depthMode === 'amount'}
                  onChange={() =>
                    onMsg({ type: 'depth_mode_changed', value: 'amount' })
                  }
                  className="radio"
                />
                <span>Amount</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="depth"
                  checked={depthMode === 'cumulative'}
                  onChange={() =>
                    onMsg({ type: 'depth_mode_changed', value: 'cumulative' })
                  }
                  className="radio"
                />
                <span>Cumulative</span>
              </label>
            </div>
          </div>
        </div>
      </details>
    </nav>
  )
}
