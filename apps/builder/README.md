# Builder

## Intention

To build a new season with races, drivers etc.

## Relevant ULRs

### Races

https://ergast.com/api/f1/2020.json

### Drivers

Drivers for a season. Might not be the best way to go
http://ergast.com/api/f1/2019/drivers.json

Driver standing
http://ergast.com/api/f1/{{season}}/driverStandings.json

Constructors for a season
http://ergast.com/api/f1/2019/constructors.json

And then for a specific team
http://ergast.com/api/f1/2019/constructors/ferrari/drivers.json

## Results

Qualify results
http://ergast.com/api/f1/{{season}}/1/qualifying.json

Race results
http://ergast.com/api/f1/{{season}}/1/results.json

## Data model

```json5
{ 
    season: {
        latestWBCJoinDate: 'before qualify the third race',
        latestRace: 'Denormalized copy of the latest race',
        currentRace: 'Denormalized copy of the current race',
        race: [
            {
              state: 'waiting, opened, closed, complete',
              openDate: 'Date of when the race opens. Normally monday after previous race',
              closeDate: 'Date of when the race closes. When the 1. free practice starts',
              location: 'The geolocation in some form',
              url: 'URL to the wiki page of the race',
              bids: [
                {
                  data: 'Contains the bids and eventually the points tally. Structure not defined'
                }       
              ],
              result: {
                data: 'Contains the result. Structure not defined'
              },
              selectedDriver: 'The selected driver',
              drivers: [
                // Any array of drivers active at the specific race
              ] 
            }     
        ], // Separate collection
        drivers: [ // Separate collection
          // An array of drivers that has participated in this season.
          // They will be marked as active or not active
        ],
        wbc:      
    }
}
```
