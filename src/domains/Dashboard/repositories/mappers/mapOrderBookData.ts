import z from 'zod'

export const orderBookEntrySchema = z.tuple([
  z.string().transform((val) => parseFloat(val)),
  z.string().transform((val) => parseFloat(val)),
])

export const orderBookDataSchema = z.object({
  lastUpdateId: z.number(),
  bids: z.array(orderBookEntrySchema),
  asks: z.array(orderBookEntrySchema),
})
