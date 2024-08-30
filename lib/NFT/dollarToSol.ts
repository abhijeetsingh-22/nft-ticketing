export const convertUsdToSol = async (usdAmount: number): Promise<number | null> => {
  try {
    // Fetch the current exchange rate from CoinGecko API
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
    
    // Check if the response is OK
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the JSON data
    const data: { solana: { usd: number } } = await response.json();
    const exchangeRate = 1 / data.solana.usd; // Get the exchange rate from USD to SOL

    // Calculate the equivalent SOL amount
    const solAmount = usdAmount * exchangeRate;

    // Return the result
    return solAmount;

  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return null;
  }
}