import axios from 'axios';

const API_URL = 'https://vinufinance.app/api/';

export async function getTokensPrices(tokens: `0x${string}`[]): Promise<object> {
  return axios.get(API_URL + `prices/${tokens.join(',')}`).then(x => x.data)
}

export async function getPoolsMonthlyAprs(pools: `0x${string}`[]): Promise<object> {
  return axios.get(API_URL + `pool/${pools.join(',')}`).then(x => x.data)
}
