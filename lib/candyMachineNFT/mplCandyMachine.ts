import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine'

// Use the RPC endpoint of your choice.
const umi = createUmi(process.env.RPC_ENDPOINT!).use(mplCandyMachine())


