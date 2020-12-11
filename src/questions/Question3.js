import React, { useEffect, useState } from 'react';

import GliderMap from '../components/GliderMap';
import StopSearch from '../components/StopSearch';
import * as API from '../util/api';

export default function Question3(props) {
    //Displaying real-time metrics for our devices' locations and statuses is a critical component of our reporting strategy.
    // This allows us to provide accurate, live data to our clients.
    //
    // Using Translink's JourneyPlanner API, implement an MVP in React for a real-time reporting dashboard.
    // What exactly this consists of is up to you, but preferably it will include:
    // - A map component (or a *very* pretty table, lol)
    // - A way to locate/inspect stops
    // - A way to track buses
    // - Information about the routes available
    //
    // As Translink's JourneyPlanner API is supposedly quite complex and undocumented (surprise surprise!) you may find this package useful:
    // https://github.com/McPo/belfast-glider-api-server
    //
    // This file contains the map component and two endpoints to obtain Stop data.

    const [stops, setStops] = useState([]);
    const [stopInfo, setStopInfo] = useState({});
    const [stopInfoStatus, setStopInfoStatus] = useState('idle');
    const [bus, setBus] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const res = await API.fetchStops();
                setStops(res.map((i) => ({ ...i, infoWindow: false })));
            } catch (error) {
                console.log('There was an error fetching stops: ', error);
            }
        })();
    }, []);

    // useEffect(() => {
    //     (async () => {
    //         const allStopInfo = await API.fetchAllStopsInfo(stops);
    //         setBus(findBuses(allStopInfo));
    //     })();
    // }, [stops]);

    const handleOpenInfoWindow = async (id) => {
        setStopInfoStatus('loading');
        setStopInfo({});
        toggleInfoWindowOpen(id);

        try {
            const res = await API.fetchStopInfo(id);
            setStopInfo(res);
        } catch (error) {
            console.error('There was an error fetching stop info');
        }

        setStopInfoStatus('idle');
    };

    const toggleInfoWindowOpen = (id) => {
        setStops(
            stops.map((s) =>
                s.id === id
                    ? { ...s, infoWindow: !s.infoWindow }
                    : { ...s, infoWindow: false }
            )
        );
    };

    return (
        <div>
            <div>
                <StopSearch
                    stops={stops}
                    handleOpenInfoWindow={handleOpenInfoWindow}
                />
            </div>
            <GliderMap
                bus={bus}
                stops={stops}
                stopInfo={stopInfo}
                stopInfoStatus={stopInfoStatus}
                handleOpenInfoWindow={handleOpenInfoWindow}
                toggleInfoWindowOpen={toggleInfoWindowOpen}
                googleMapURL={
                    'https://maps.googleapis.com/maps/api/js?key=AIzaSyBkHRuOEvL8BERtTR0oIB-mw8e0QkMVA2U&v=3.exp&libraries=geometry,drawing,places'
                }
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={
                    <div style={{ height: `800px`, margin: 20 }} />
                }
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}

function findBuses(stops) {
    //find lowest min_until
    let min = stops[0];
    for (let i = 1; i < stops.length; i++) {
        let value = stops[i];
        min =
            value.departures[0].min_until < min.departures[0].min_until
                ? value
                : min;
    }

    return min;
}
