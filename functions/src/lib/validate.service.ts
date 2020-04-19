import { Bid, IRace, logAndCreateError } from ".";


const noNullsInArrayFn = (array: (string | null)[]): boolean => array.every(Boolean);
const uniqueDriversFn = (array: (string | null)[]): boolean => array.length === new Set(array).size;
const validArraysFn = (array: (string | null)[]): boolean => noNullsInArrayFn(array) && uniqueDriversFn(array);

export const validateBid = (bid: Bid, race: IRace): void => {
  const lengths = {
    podium: 3,
    qualify: 6,
    fastestDriver: 1,
    firstCrash: 1,
  } as { [key: string]: number }
  const validArrays: boolean = Object.values(bid).filter(v => Array.isArray(v)).map(validArraysFn).every(Boolean) && Object.keys(lengths).every(key => lengths[key] === (bid as any)[key].length);
  const validPole: boolean = !!(bid.polePositionTime && (bid.polePositionTime < (1000 * 60 * 2)) && (bid.polePositionTime > (1000 * 60)));
  const validSelected: boolean = !!(bid.selectedDriver && bid.selectedDriver.grid && bid.selectedDriver.grid > 0 && bid.selectedDriver.grid <= race.drivers!.length
    && bid.selectedDriver.finish && bid.selectedDriver.finish > 0 && bid.selectedDriver.finish <= race.drivers!.length)
  if (![validArrays, validPole, validSelected].every(Boolean)) {
    throw logAndCreateError('failed-precondition', `Bid not valid. Arrays: ${validArrays}, valid selected: ${validSelected}, valid pole: ${validPole}`)
  }
}

export const validateResult = (result: Bid, race: IRace): void => {
  const lengths = {
    podium: 3,
    qualify: 6,
    fastestDriver: 1,
    firstCrash: 1,
  } as { [key: string]: number }
  const validArrays: boolean = Object.values(result).filter(v => Array.isArray(v)).map(validArraysFn).every(Boolean) && Object.keys(lengths).every(key => lengths[key] >= (result as any)[key].length);
  const validPole: boolean = !!(result.polePositionTime && (result.polePositionTime < (1000 * 60 * 2)) && (result.polePositionTime > (1000 * 60)));
  const validSelected: boolean = !!(result.selectedDriver && result.selectedDriver.grid && result.selectedDriver.grid > 0 && result.selectedDriver.grid <= race.drivers!.length
    && result.selectedDriver.finish && result.selectedDriver.finish > 0 && result.selectedDriver.finish <= race.drivers!.length)
  if (![validArrays, validPole, validSelected].every(Boolean)) {
    throw logAndCreateError('failed-precondition', `Result not valid. Arrays: ${validArrays}, valid selected: ${validSelected}, valid pole: ${validPole}`)
  }

}
